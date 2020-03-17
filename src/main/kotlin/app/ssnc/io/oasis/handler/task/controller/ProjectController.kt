package app.ssnc.io.oasis.handler.task.controller

import app.ssnc.io.oasis.config.ApiConfig
import app.ssnc.io.oasis.config.ApiConfig.API_PATH
import app.ssnc.io.oasis.config.ApiConfig.API_VERSION
import app.ssnc.io.oasis.entity.request.CreateProjectRequest
import app.ssnc.io.oasis.entity.request.SearchRuleRequest
import app.ssnc.io.oasis.handler.task.service.TaskService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiResponse
import io.swagger.annotations.ApiResponses
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(path = ["/${API_PATH}/${API_VERSION}/project"])
@Api(value = "project", description = "Rest API for project operations", tags = arrayOf("project API"))
class ProjectController {
    @Autowired
    private lateinit var taskService: TaskService

    @PostMapping("/create")
    @ApiOperation(value = "프로젝트 신규 생")//, response = Greeting::class)
    @ApiResponses(
        value = *arrayOf(
            ApiResponse(code = 200, message = "OK"),
            ApiResponse(code = 401, message = "You are not authorized access the resource")
        )
    )
    fun searchRule(@RequestBody request: CreateProjectRequest) =
        ResponseEntity.ok(taskService.createProject(request))

}