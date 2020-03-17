package app.ssnc.io.oasis.handler.firewall.controller

import app.ssnc.io.oasis.config.ApiConfig
import app.ssnc.io.oasis.config.ApiConfig.API_PATH
import app.ssnc.io.oasis.config.ApiConfig.API_VERSION
import app.ssnc.io.oasis.handler.firewall.entity.SearchRuleRequest
import app.ssnc.io.oasis.handler.firewall.service.FirewallService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiResponse
import io.swagger.annotations.ApiResponses
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.ok
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(path = ["/${API_PATH}/${API_VERSION}/firewall"])
@Api(value = "firewall", description = "Rest API for firewall operations", tags = arrayOf("firewall API"))
class FirewallController {
    @Autowired
    private lateinit var firewallService: FirewallService

    @PostMapping("/search")
    @ApiOperation(value = "방화벽 등록 정책 유효성 체크")//, response = Greeting::class)
    @ApiResponses(
        value = *arrayOf(
            ApiResponse(code = 200, message = "OK"),
            ApiResponse(code = 401, message = "You are not authorized access the resource"),
            ApiResponse(code = 404, message = "The resource not found"),
            ApiResponse(code = 422, message = "Firewall Compliance")
        )
    )
    fun searchRule(@RequestBody request: SearchRuleRequest) =
        ok(firewallService.searchRule(request))

    @PostMapping("/request")
    @ApiOperation(value = "")//, response = Greeting::class)
    @ApiResponses(
        value = *arrayOf(
            ApiResponse(code = 200, message = "OK"),
            ApiResponse(code = 401, message = "You are not authorized access the resource"),
            ApiResponse(code = 404, message = "The resource not found"),
            ApiResponse(code = 422, message = "Firewall Compliance")
        )
    )
    fun requestRule(@RequestBody request: SearchRuleRequest) =
        ok(firewallService.searchRule(request))

    @PostMapping("/register")
    @ApiOperation(value = "")//, response = Greeting::class)
    @ApiResponses(
        value = *arrayOf(
            ApiResponse(code = 200, message = "OK"),
            ApiResponse(code = 401, message = "You are not authorized access the resource"),
            ApiResponse(code = 404, message = "The resource not found"),
            ApiResponse(code = 422, message = "Firewall Compliance")
        )
    )
    fun registerRule(@RequestBody request: SearchRuleRequest) =
        ok(firewallService.searchRule(request))
}