package app.ssnc.io.oasis.security.jwt

import io.jsonwebtoken.*
import io.jsonwebtoken.Jwts.builder
import io.jsonwebtoken.Jwts.parser
import io.jsonwebtoken.SignatureAlgorithm.HS512
import app.ssnc.io.oasis.constant.Constants
import app.ssnc.io.oasis.exception.CustomException
import app.ssnc.io.oasis.security.CustomUserDetails
import app.ssnc.io.oasis.security.OasisWebAuthenticationToken
import app.ssnc.io.oasis.security.UserPrincipal
import mu.KLogger
import mu.KLogging
import mu.KotlinLogging
import org.apache.commons.lang3.StringUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR
import org.springframework.http.HttpStatus.UNAUTHORIZED
import org.springframework.security.core.Authentication
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.stereotype.Component
import java.lang.System.currentTimeMillis
import java.util.*
import java.util.concurrent.TimeUnit
import javax.annotation.PostConstruct
import javax.servlet.http.HttpServletRequest

@Component
class JwtTokenProvider(
    @Value("\${jwt.secret.key}")
    val secretKey: String,
    @Value("\${jwt.token.expiration.seconds.without-remember-me}")
    val tokenExpirationWithoutRememberMe: Long,
    @Value("\${jwt.token.expiration.seconds.with-remember-me}")
    val tokenExpirationWithRememberMe: Long
) {
    // FIXME: Get secret key from the configuration server.
//    @Value("\${security.jwt.token.secret-key:$TOKEN_SECRET_KEY}")
//    private lateinit var secretKey: String
//
//    @Value("\${security.jwt.token.expire-length:$TOKEN_EXPIRATION_TIME}")
//    private var expirationTime: Long = -1
    val log: KLogger = KotlinLogging.logger { }

    @Autowired
    private lateinit var userDetails: CustomUserDetails

    fun getUsernameFromToken(token: String?): String? = getClaimFromToken(token, Claims::getSubject)

    fun getExpirationDateFromToken(token: String): Date? = getClaimFromToken(token, Claims::getExpiration)

    fun getIssuedAtFromToken(token: String): Date? = getClaimFromToken(token, Claims::getIssuedAt)

    fun getAuthoritiesFromToken(claims: Claims): List<SimpleGrantedAuthority> {
        return claims[Constants.AUTHORITIES_KEY]
            .toString()
            .split(",")
            .map { SimpleGrantedAuthority(it) }
    }


    fun createToken(authentication: Authentication, rememberMe: Boolean): String? {
        //val authorities: String = authentication.authorities.joinToString(",")
        val userPrincipal = authentication.principal as UserPrincipal
        val now: Long = currentTimeMillis()
        val validity: Long = calculateExpirationDate(rememberMe, now)
        return builder()
            //.claim(Constants.AUTHORITIES_KEY, authorities)
            .signWith(HS512, secretKey)
            .setExpiration(Date(validity))
            .setSubject(userPrincipal.user.email.toString())
            .setIssuedAt(Date(now))
            .compact()

    }

    fun refreshToken(token: String, rememberMe: Boolean): String {
        val now: Long = currentTimeMillis()
        val expirationDate = calculateExpirationDate(rememberMe, now)
        val claims = getClaims(token)
        claims.issuedAt = Date(now)
        claims.expiration = Date(expirationDate)
        return builder()
            .setClaims(claims)
            .signWith(HS512, secretKey)
            .compact()
    }

    fun calculateExpirationDate(rememberMe: Boolean, now: Long): Long {
        return when {
            rememberMe -> now + TimeUnit.SECONDS.toMillis(tokenExpirationWithRememberMe)
            else -> now + TimeUnit.SECONDS.toMillis(tokenExpirationWithoutRememberMe)
        }
    }

    fun getAuthentication(token: String): Authentication {
        val claims: Claims = getClaims(token)
        val authorities: List<SimpleGrantedAuthority> = getAuthoritiesFromToken(claims)
        val user = User(claims.subject, StringUtils.EMPTY, authorities)
        return OasisWebAuthenticationToken(user, token, authorities)
    }


    private fun getClaims(token: String?): Claims {
        return parser()
            .setSigningKey(secretKey)
            .parseClaimsJws(token)
            .body
    }

    fun userIdFromJwt(token: String): String {
        return Jwts.parser()
            .setSigningKey(secretKey)
            .parseClaimsJws(token)
            .body
            .subject
    }

    private fun <T> getClaimFromToken(token: String?, claimsResolver: (Claims) -> T): T? {
        val claims = getClaims(token)
        return claimsResolver.invoke(claims)
    }

    fun validateToken(authToken: String?): Boolean {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(authToken)
            return true
        } catch (e: SignatureException) {
            log.info("Invalid JWT signature.")
            log.trace("Invalid JWT signature trace: $e")
        } catch (e: MalformedJwtException) {
            log.info("Invalid JWT token.")
            log.trace("Invalid JWT token trace: $e")
        } catch (e: ExpiredJwtException) {
            log.info("Expired JWT token.")
            log.trace("Expired JWT token trace: $e")
        } catch (e: UnsupportedJwtException) {
            log.info("Unsupported JWT token.")
            log.trace("Unsupported JWT token trace: $e")
        } catch (e: IllegalArgumentException) {
            log.info("JWT token compact of handler are invalid.")
            log.trace("JWT token compact of handler are invalid trace: $e")
        }

        return false
    }

}