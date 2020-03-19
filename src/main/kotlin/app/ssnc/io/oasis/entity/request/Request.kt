package app.ssnc.io.oasis.entity.request

import app.ssnc.io.oasis.entity.model.enum.Protocol
import app.ssnc.io.oasis.entity.model.enum.RuleActions
import org.springframework.web.bind.annotation.PathVariable
import java.time.LocalDate
import javax.persistence.EnumType
import javax.persistence.Enumerated

data class LoginRequest (
    val email: String,
    val password: String,
    val admin_yn: String
)

data class SearchUserRequest(
    var key: String,
    var id: String
)

data class SearchRuleRequest (
    val src_type: String,
    val src_address: String,
    val dest_type: String,
    val dest_address: String,
    @Enumerated(EnumType.STRING) val protocol: Protocol,
    val port: Int,
    @Enumerated(EnumType.STRING) val rule_action: RuleActions,
    val start_date: LocalDate,
    val end_date: LocalDate,
    val comment: String?,
    val status: String
)

data class FirewallRequest (
    val rules: MutableSet<SearchRuleRequest>,
    val assigns: List<Assign>,
    val receiver: Assign,
    val creator: Long
)

data class Assign (
    val user_id: String,
    val username: String,
    val order: Int? = 0
)

data class CreateProjectRequest(
    val key: String,
    val name: String,
    val description: String,
    val owner: Long
)