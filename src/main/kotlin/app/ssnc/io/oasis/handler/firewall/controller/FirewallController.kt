package app.ssnc.io.oasis.handler.firewall.controller

import app.ssnc.io.oasis.config.ApiConfig
import app.ssnc.io.oasis.config.ApiConfig.API_PATH
import app.ssnc.io.oasis.config.ApiConfig.API_VERSION
import app.ssnc.io.oasis.entity.request.FirewallRequest
import app.ssnc.io.oasis.entity.request.SearchRuleRequest
import app.ssnc.io.oasis.entity.response.ResultResponse
import app.ssnc.io.oasis.handler.firewall.service.FirewallService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiResponse
import io.swagger.annotations.ApiResponses
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.ok
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestController
@RequestMapping(path = ["/${API_PATH}/${API_VERSION}/firewall"])
@Api(value = "firewall", description = "Rest API for firewall operations", tags = arrayOf("firewall API"))
class FirewallController : ResponseEntityExceptionHandler() {
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
    fun searchRule(@RequestBody request: SearchRuleRequest) : ResultResponse {
        return ResultResponse.success(firewallService.searchRule(request))
    }

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
    fun requestRule(@RequestBody request: SearchRuleRequest) : ResultResponse {
        return ResultResponse.success(firewallService.searchRule(request))
    }


    @PostMapping("/approval")
    @ApiOperation(value = "방화벽 승인 요청 API")//, response = Greeting::class)
    @ApiResponses(
        value = *arrayOf(
            ApiResponse(code = 200, message = "OK"),
            ApiResponse(code = 401, message = "You are not authorized access the resource"),
            ApiResponse(code = 404, message = "The resource not found"),
            ApiResponse(code = 422, message = "Firewall Compliance")
        )
    )
    fun approvalFirewall(@RequestBody request: FirewallRequest) =
        ok(firewallService.approvalFirewall(request))

    @GetMapping("/approval/{userId}")
    @ApiOperation(value = "방화벽 승인 요청 검색 API")//, response = Greeting::class)
    @ApiResponses(
        value = *arrayOf(
            ApiResponse(code = 200, message = "OK"),
            ApiResponse(code = 401, message = "You are not authorized access the resource"),
            ApiResponse(code = 404, message = "The resource not found"),
            ApiResponse(code = 422, message = "Firewall Compliance")
        )
    )
    fun searchApprovalFirewall(@PathVariable userId: String) : ResultResponse {
        return ResultResponse.success(data = firewallService.searchApprovalFirewall(userId))
    }

    @GetMapping("/approval/detail/{id}")
    @ApiOperation(value = "방화벽 승인 요청 상세 검색 API")//, response = Greeting::class)
    @ApiResponses(
        value = *arrayOf(
            ApiResponse(code = 200, message = "OK"),
            ApiResponse(code = 401, message = "You are not authorized access the resource"),
            ApiResponse(code = 404, message = "The resource not found"),
            ApiResponse(code = 422, message = "Firewall Compliance")
        )
    )
    fun searchApprovalDetailFirewall(@PathVariable id: Long) : ResultResponse {
        return ResultResponse.success(data = firewallService.searchApprovalDetailFirewall(id))
    }
}