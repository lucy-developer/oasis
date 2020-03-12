package app.ssnc.io.oasis.security.jwt

import app.ssnc.io.oasis.security.CustomUserDetails
import mu.KLogging
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.web.filter.OncePerRequestFilter
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class JwtAuthenticationFilter(
    private val tokenProvider: JwtTokenProvider,
    private val userDetailsService: CustomUserDetails
) : OncePerRequestFilter() {

    companion object : KLogging()

    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, filterChain: FilterChain) {
        try {
            jwtFromRequest(request)?.takeIf { it.isNotBlank() }
                ?.takeIf { tokenProvider.validateToken(it) }
                ?.let { jwt ->
                    val userEmail = tokenProvider.userIdFromJwt(jwt)

                    // Note that you could also encode the user's username and roles inside JWT claims
                    // and create the UserDetails object by parsing those claims from the JWT.
                    // That would avoid the following database hit. It's completely up to you.
                    val user = userDetailsService.loadUserByUsername(userEmail)
                    logger.debug{ "user role : "+ user.authorities }
                    val authenticationToken = UsernamePasswordAuthenticationToken(user, null, user.authorities)
                    authenticationToken.details = WebAuthenticationDetailsSource().buildDetails(request)
                    SecurityContextHolder.getContext().authentication = authenticationToken
                }
        } catch (ex: Exception) {
            logger.error("Could not set user authentication in security context", ex)
        }
        filterChain.doFilter(request, response)
    }

    private fun jwtFromRequest(request: HttpServletRequest): String? {
        val bearer = request.getHeader("Authorization") ?: ""
        if (bearer.startsWith("Bearer ")) {
            return bearer.substring(7)
        }
        return null
    }

}