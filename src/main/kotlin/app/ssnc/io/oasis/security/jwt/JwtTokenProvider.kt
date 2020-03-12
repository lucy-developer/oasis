package app.ssnc.io.oasis.security.jwt

import io.jsonwebtoken.*
import app.ssnc.io.oasis.common.config.SecurityConfig.TOKEN_EXPIRATION_TIME
import app.ssnc.io.oasis.common.config.SecurityConfig.TOKEN_HEADER
import app.ssnc.io.oasis.common.config.SecurityConfig.TOKEN_SECRET_KEY
import app.ssnc.io.oasis.common.config.SecurityConfig.TOKEN_TYPE
import app.ssnc.io.oasis.exception.CustomException
import app.ssnc.io.oasis.security.CustomUserDetails
import app.ssnc.io.oasis.security.UserPrincipal
import mu.KLogging

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR
import org.springframework.http.HttpStatus.UNAUTHORIZED
import org.springframework.security.core.Authentication
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.stereotype.Component
import java.util.*
import javax.annotation.PostConstruct
import javax.servlet.http.HttpServletRequest

@Component
class JwtTokenProvider {
    // FIXME: Get secret key from the configuration server.
//    @Value("\${security.jwt.token.secret-key:$TOKEN_SECRET_KEY}")
//    private lateinit var secretKey: String
//
//    @Value("\${security.jwt.token.expire-length:$TOKEN_EXPIRATION_TIME}")
//    private var expirationTime: Long = -1
    companion object : KLogging()
    private var secretKey = TOKEN_SECRET_KEY
    private var expirationTime = TOKEN_EXPIRATION_TIME

    @Autowired
    private lateinit var userDetails: CustomUserDetails

    @PostConstruct
    protected fun init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.toByteArray())
    }


//    fun createToken(username: String, role: UserRole): String {
//        val claims = Jwts.claims().setSubject(username)
//        claims["auth"] = SimpleGrantedAuthority(role.authority)
//
//        val now = Date()
//        val expiration = Date(now.time + expirationTime)
//        return Jwts.builder()
//            .setClaims(claims)
//            .setIssuedAt(now)
//            .setExpiration(expiration)
//            .signWith(SignatureAlgorithm.HS256, secretKey)
//            .compact()
//    }
//    @Throws(CustomException::class)
//    fun getAuthenticationOrThrow(token: String): Authentication {
//        val username = getUsernameOrThrow(token)
//        logger.info { "getAuthenticationOrThrow usernmae : " + username }
//
//        val details = userDetails.loadUserByUsername(username)
//        return UsernamePasswordAuthenticationToken(userDetails, "", details.authorities)
//    }
//
//    @Throws(CustomException::class)
//    fun getUsernameOrThrow(
//        token: String
//    ): String = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).body.subject
//        ?: throw CustomException("Invalid token", UNAUTHORIZED)
//
//    fun resolveTokenOrNull(
//        request: HttpServletRequest
//    ) = request.getHeader(TOKEN_HEADER)?.removePrefix("$TOKEN_TYPE ")
//
//    @Throws(CustomException::class)
//    fun resolveTokenOrThrow(
//        request: HttpServletRequest
//    ) = resolveTokenOrNull(request)
//        ?: throw CustomException("Invalid token", UNAUTHORIZED)
//
//    @Throws(CustomException::class)
//    fun validateTokenOrThrow(token: String) {
//        try {
//            Jwts.parser()
//                .setSigningKey(secretKey)
//                .parseClaimsJws(token)
//        } catch (exception: Exception) {
//            when (exception) {
//                is IllegalArgumentException,
//                is JwtException -> throw CustomException("Invalid token", UNAUTHORIZED)
//                else -> throw CustomException("Unknown exception", INTERNAL_SERVER_ERROR)
//            }
//        }
//    }

    //userPrincipal 반영 변경
    fun createToken(authentication: Authentication): String{
        val userPrincipal = authentication.principal as UserPrincipal

        val issuedAt = Date()
        val expiredIn = Date(issuedAt.time + expirationTime)

        return Jwts.builder()
            .setSubject(userPrincipal.user.email)
            .setIssuedAt(issuedAt)
            .setExpiration(expiredIn)
            .signWith(SignatureAlgorithm.HS512, secretKey)
            .compact()
    }

    fun userIdFromJwt(token: String): String {
        return Jwts.parser()
            .setSigningKey(secretKey)
            .parseClaimsJws(token)
            .body
            .subject
    }

    fun validateToken(token: String): Boolean{
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token)
            return true
        } catch (ex: SignatureException) {
            logger.error("Invalid JWT signature")
        } catch (ex: MalformedJwtException) {
            logger.error("Invalid JWT token")
        } catch (ex: ExpiredJwtException) {
            logger.error("Expired JWT token")
        } catch (ex: UnsupportedJwtException) {
            logger.error("Unsupported JWT token")
        } catch (ex: IllegalArgumentException) {
            logger.error("JWT claims string is empty.")
        }

        return false
    }

    fun resolveTokenOrNull(
        request: HttpServletRequest
    ) = request.getHeader(TOKEN_HEADER)?.removePrefix("$TOKEN_TYPE ")

    @Throws(CustomException::class)
    fun resolveTokenOrThrow(
        request: HttpServletRequest
    ) = resolveTokenOrNull(request)
        ?: throw CustomException("Invalid token", UNAUTHORIZED)

    private val currentTimeMillis: Long
        get() = System.currentTimeMillis()

    fun generateExpirationDate(): Long {
        return currentTimeMillis + expirationTime * 1000
    }




}