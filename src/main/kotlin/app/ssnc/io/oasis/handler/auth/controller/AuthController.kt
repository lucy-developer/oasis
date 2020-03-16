package app.ssnc.io.oasis.handler.auth.controller

import app.ssnc.io.oasis.config.ApiConfig.API_PATH
import app.ssnc.io.oasis.config.ApiConfig.API_VERSION
import app.ssnc.io.oasis.config.ApiConfig.AUTH_PATH
import app.ssnc.io.oasis.entity.request.LoginRequest
import app.ssnc.io.oasis.handler.auth.service.AuthService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.servlet.http.HttpServletRequest

@RestController
@RequestMapping(path = ["/$API_PATH/$API_VERSION/$AUTH_PATH"])
class AuthController {
    @Autowired
    private lateinit var authService: AuthService

    @PostMapping(
            path = ["/login"],
            consumes = [MediaType.APPLICATION_JSON_VALUE],
            produces = [MediaType.APPLICATION_JSON_VALUE])
    fun login(servlet: HttpServletRequest, @RequestBody request: LoginRequest
    ) = ResponseEntity.status(HttpStatus.OK).body(authService.login(servlet, request))
}