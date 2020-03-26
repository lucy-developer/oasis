package app.ssnc.io.oasis.handler.firewall.service

import app.ssnc.io.oasis.entity.model.Task
import app.ssnc.io.oasis.entity.model.TaskAssign
import app.ssnc.io.oasis.entity.model.enum.AssignStatus
import app.ssnc.io.oasis.entity.model.enum.AuditStatus
import app.ssnc.io.oasis.entity.request.FirewallRequest
import app.ssnc.io.oasis.entity.request.SearchRuleRequest
import app.ssnc.io.oasis.entity.request.processApporovalFirewallRequest
import app.ssnc.io.oasis.exception.HandleConstraintViolationException
import app.ssnc.io.oasis.exception.ResourceNotFoundException
import app.ssnc.io.oasis.exception.UniquenessFieldException
import app.ssnc.io.oasis.handler.firewall.entity.ApporovalDetailRes
import app.ssnc.io.oasis.handler.firewall.entity.SearchRuleReq
import app.ssnc.io.oasis.handler.task.service.TaskService
import app.ssnc.io.oasis.handler.user.service.UserService
import app.ssnc.io.oasis.util.DateUtil
import app.ssnc.io.oasis.util.wallbrain.WallBrainRestApiClient
import app.ssnc.io.oasis.util.web.RestClient
import com.sds.wallbrain.base.FirewallRuleSessionInfoVo
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
    fun searchRule(request: SearchRuleRequest): Any? {
        val data = HashMap<String, String>()
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
            if (result.resultStatus == "allowed") {
                data["check"] = "ERROR"
                data["duplication"] = "Y"
                data["message"] = "방화벽 요청 중복"
                return data
            }

            if (result.isCompliance) {
                data["check"] = "ERROR"
                data["compliance"] = "Y"
                data["message"] = result.complianceComment
                return data
            }
        }
        data["check"] = "SUCCESS"
        return data
    }

    fun approvalFirewall(request: FirewallRequest) {
        taskService.findProjectByName("FIREWALL")?.let { project ->

            val task = Task(
                projectId = project.id!!, title = "방화벽 신청",
                key = taskService.generationKey(project.id!!),
                creator = userService.findById(request.creator).get(),
//                assignee = userService.findByName(request.assigns!!.find { it.order == 0 }!!.user_id)!!,
                details = request.rules
            )

            taskService.createTask(task)

            request.assigns!!.forEach { assign ->
                val taskAssign = TaskAssign(projectId = project.id!!, taskId = task.id!!,
                    orderNo = assign.order, status = AssignStatus.PENDING,
                    assign = userService.findByEmail(assign.user_id)!!)
                taskService.createTaskAssigns(taskAssign)
                if (request.assigns.minBy { it.order!! }!!.order == assign.order) {
                    task.assignee = taskAssign
                    taskService.createTask(task)
                }
            }
        }?: run {
            throw ResourceNotFoundException("Project not found")
        }
    }

    fun searchApprovalFirewall(userId: String) : Any? {
        taskService.findProjectByName("FIREWALL")?.let { project ->
            //요청한 사람 기준으로 조회
            return taskService.searchTaskByProject(project.id!!)
        }?: run {
            throw ResourceNotFoundException("Project not found")
        }
    }

    fun searchApprovalDetailFirewall(id: Long) : Any? {
        taskService.searchTaskById(id)?.let { it ->
            val result = ApporovalDetailRes(
                task = it,
                assignees = taskService.searchTaskAssigneeByTask(id)!!)
            return result
        }?: run {
            throw ResourceNotFoundException("Task not found")
        }
    }

    fun processApprovalFirewall(request: processApporovalFirewallRequest) {
        taskService.searchTaskById(request.task)?.let { task ->
            taskService.searchTaskAssignById(request.assignee)?.let { taskAssign ->
                taskAssign.status = request.status
                taskService.createTaskAssigns(taskAssign)
                val exist = taskService.searchTaskAssignByTaskAndOrder(taskId = request.task, order = taskAssign.orderNo!!+1)
                if (exist == null) {
                    task.status = AuditStatus.CONFIRMED
                    // todo FPMS 요청
                } else {
                    task.status = AuditStatus.APPROVAL
                    task.assignee = taskService.searchTaskAssignByTaskAndOrder(taskId = request.task, order = taskAssign.orderNo!!+1)
                }
                taskService.createTask(task)
            } ?: run {
                throw ResourceNotFoundException("Task Assignee not found")
            }
        } ?: run {
            throw ResourceNotFoundException("Task not found")
        }
    }
}