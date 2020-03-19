package app.ssnc.io.oasis.handler.user.controller

import app.ssnc.io.oasis.config.ApiConfig.API_PATH
import app.ssnc.io.oasis.config.ApiConfig.API_VERSION
import app.ssnc.io.oasis.entity.model.User
import app.ssnc.io.oasis.entity.request.SearchUserRequest
import app.ssnc.io.oasis.exception.ResourceNotFoundException
import app.ssnc.io.oasis.handler.user.service.UserService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.ok
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping(path = ["/$API_PATH/$API_VERSION/user"], produces = [MediaType.APPLICATION_JSON_VALUE])
@Api(value = "USER", description = "Rest API for USER operations", tags = arrayOf("USER API"))
class UserController {
    @Autowired
    private lateinit var userService: UserService

    @GetMapping("/all")
    @ApiOperation(value = "사용자 전체 리스트 조회")
    fun searchAll() = ResponseEntity.status(HttpStatus.OK).body(userService.searchAll())

    @CrossOrigin(origins = ["http://localhost:3000"])
    @PostMapping("/search")
    @ApiOperation(value = "사용자 조회, Key(NAME,ID) , id는 사용자 정보")
    fun search(@RequestBody request: SearchUserRequest) : ResponseEntity<*> {
        return ResponseEntity.status(HttpStatus.OK).body(userService.search(request))
    }
//    } catch (e: ResourceNotFoundException) {
//        ResponseEntity(HttpStatus.NOT_FOUND)
//    }

}