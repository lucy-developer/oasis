package app.ssnc.io.oasis.handler.auth.service

import app.ssnc.io.oasis.entity.request.LoginRequest
import app.ssnc.io.oasis.entity.response.LoginResponse
import app.ssnc.io.oasis.exception.CustomException
import app.ssnc.io.oasis.handler.user.service.UserService
import app.ssnc.io.oasis.repository.EmployeeRepository
import app.ssnc.io.oasis.security.jwt.JwtTokenProvider
import mu.KLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.AuthenticationException
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import java.lang.System.currentTimeMillis
import javax.servlet.http.HttpServletRequest

@Service
class AuthService {
    companion object : KLogging()

    @Autowired
    private lateinit var authenticationManager: AuthenticationManager

    @Autowired
    private lateinit var tokenProvider: JwtTokenProvider

    @Autowired
    private lateinit var employeeRepository: EmployeeRepository

    @Autowired
    private lateinit var userService: UserService

    fun login(servlet: HttpServletRequest, request: LoginRequest): LoginResponse = with(request) {
        try {
            val authentication = authenticationManager.authenticate(
                    UsernamePasswordAuthenticationToken(
                            request.email,
                            request.password
                    )
            )

            val user = userService.findByEmail(request.email)
                    ?: throw CustomException("User not found", HttpStatus.NOT_FOUND)

            val password = BCryptPasswordEncoder().encode(request.password)

            SecurityContextHolder.getContext().authentication = authentication

            return LoginResponse(
                    "Bearer",
                    tokenProvider.createToken(authentication, true)!!,
                    tokenProvider.createToken(authentication, true)!!,
                    tokenProvider.calculateExpirationDate(true, currentTimeMillis()),
                    tokenProvider.createToken(authentication, true)!!,
                    user)
        } catch (exception: AuthenticationException) {
            throw CustomException("Invalid username or password", HttpStatus.UNPROCESSABLE_ENTITY)
        }
    }


}