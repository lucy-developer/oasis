package app.ssnc.io.oasis.handler.firewall.service

import app.ssnc.io.oasis.entity.model.Task
import app.ssnc.io.oasis.entity.request.FirewallRequest
import app.ssnc.io.oasis.entity.request.SearchRuleRequest
import app.ssnc.io.oasis.exception.HandleConstraintViolationException
import app.ssnc.io.oasis.exception.ResourceNotFoundException
import app.ssnc.io.oasis.exception.UniquenessFieldException
import app.ssnc.io.oasis.handler.firewall.entity.SearchRuleReq
import app.ssnc.io.oasis.handler.task.service.TaskService
import app.ssnc.io.oasis.handler.user.service.UserService
import app.ssnc.io.oasis.util.DateUtil
import app.ssnc.io.oasis.util.wallbrain.WallBrainRestApiClient
import app.ssnc.io.oasis.util.web.RestClient
import com.sds.wallbrain.base.FirewallRuleSessionInfoVo
import com.sds.wallbrain.base.RuleSetGroupInfoVo
import mu.KLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service


@Service
class FirewallService(
    @Value("\${wallbrain.ws.api-user-id}")
    val apiUserId: String,
    @Value("\${wallbrain.ws.api-user-password}")
    val apiUserPasswd: String,
    @Value("\${wallbrain.ws.baseurl")
    val apiUrl: String
) {
    companion object : KLogging()

    @Autowired
    private lateinit var wallBrainRestApiClient: WallBrainRestApiClient

    @Autowired
    private lateinit var restClient: RestClient

    @Autowired
    private lateinit var taskService: TaskService

    @Autowired
    private lateinit var userService: UserService

    @Throws(UniquenessFieldException::class, HandleConstraintViolationException::class)
    fun searchRule(request: SearchRuleRequest) {
        //val rule = HashMap<String, String>()
        val searchRule = SearchRuleReq(
            srcAddr = request.src_address,
            dstAddr = request.dest_address,
            dstPort = request.port.toString(),
            protocol = request.protocol.toString(),
            withDiscovery = "true",
            startDate = DateUtil.formatDateToLocalDate(request.start_date, "YYYYMMdd"),
            expireDate = DateUtil.formatDateToLocalDate(request.end_date, "YYYYMMdd")
        )

        val results: Array<FirewallRuleSessionInfoVo> = wallBrainRestApiClient.searchRuleSetGroup("/provision/rule/search", searchRule)

        for (result in results ) {
            if (result.resultStatus == "allowed")
                throw UniquenessFieldException("방화벽 중복 등록 요청")

            if (result.isCompliance)
                throw HandleConstraintViolationException(result.complianceComment)
        }
    }

    fun approvalFirewall(request: FirewallRequest) {
        taskService.findProjectByName("FIREWALL")?.let { project ->
            val task = Task(
                projectSeq = project.id!!, title = "방화벽 신청",
                key = taskService.generationKey(project.id!!),
                creator = userService.findById(request.creator).get(),
                details = request.rules
            )
            taskService.createTask(task)
        }. run {
            throw ResourceNotFoundException("Project not found")
        }

    }



}