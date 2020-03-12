package app.ssnc.io.oasis.security.jwt

import mu.KLogging
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.AuthenticationEntryPoint
import org.springframework.stereotype.Component
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
class JwtAuthenticationEntryPoint: AuthenticationEntryPoint {

    companion object : KLogging()

    override fun commence(request: HttpServletRequest?, response: HttpServletResponse?, authException: AuthenticationException?) {
        logger.error("Responding with unauthorized error. Message - {}", authException?.message)
        response?.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException?.message)
    }

}