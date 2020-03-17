package app.ssnc.io.oasis.handler.user.controller

import app.ssnc.io.oasis.config.ApiConfig.API_PATH
import app.ssnc.io.oasis.config.ApiConfig.API_VERSION
import app.ssnc.io.oasis.entity.model.User
import app.ssnc.io.oasis.exception.ResourceNotFoundException
import app.ssnc.io.oasis.handler.user.service.UserService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.ok
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
@RequestMapping(path = ["/${API_PATH}/${API_VERSION}/user"])
@Api(value = "USER", description = "Rest API for USER operations", tags = arrayOf("USER API"))
class UserController {
    @Autowired
    private lateinit var userService: UserService

    @GetMapping("/all")
    @ApiOperation(value = "사용자 전체 리스트 조회")
    fun searchAll() = ok(userService.searchAll())

    @GetMapping("/search/{key}/{id}")
    @ApiOperation(value = "사용자 조회, Key(NAME,ID) , id는 사용자 정")
    fun search(@PathVariable key: String, @PathVariable id: String) :ResponseEntity<User> = try {
        ResponseEntity(userService.search(key, id), HttpStatus.OK)
    } catch (e: ResourceNotFoundException) {
        ResponseEntity(HttpStatus.NOT_FOUND)
    }

}