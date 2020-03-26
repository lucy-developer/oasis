package app.ssnc.io.oasis.entity.request

import app.ssnc.io.oasis.entity.model.enum.AssignStatus
import app.ssnc.io.oasis.entity.model.enum.Protocol
import app.ssnc.io.oasis.entity.model.enum.RuleActions
import app.ssnc.io.oasis.entity.model.type.json.JsonBinaryType
import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonProperty
import org.hibernate.annotations.TypeDef
import org.springframework.web.bind.annotation.PathVariable
import java.time.LocalDate
import javax.persistence.EnumType
import javax.persistence.Enumerated
import java.io.Serializable

data class LoginRequest (
    val email: String,
    val password: String,
    val admin_yn: String
)

data class SearchUserRequest(
    var key: String,
    var id: String
)

@JsonInclude(JsonInclude.Include.NON_NULL)
@TypeDef(typeClass = JsonBinaryType::class, name = "jsonb")
data class SearchRuleRequest (
    @JsonProperty("src_type") val src_type: String,
    @JsonProperty("src_address")  val src_address: String,
    @JsonProperty("dest_type") val dest_type: String,
    @JsonProperty("dest_address") val dest_address: String,
    @Enumerated(EnumType.STRING) @JsonProperty("protocol") val protocol: Protocol,
    @JsonProperty("port") val port: Int,
    @Enumerated(EnumType.STRING) @JsonProperty("rule_action") val rule_action: RuleActions,
    @JsonProperty("start_date") val start_date: LocalDate,
    @JsonProperty("end_date") val end_date: LocalDate,
    @JsonProperty("comment") val comment: String?,
    @JsonProperty("status") val status: String
): Serializable {
    companion object {
        private const val serialVersionUID = 7542115783552544574L
    }

}

data class FirewallRequest (
//    val rules: MutableList<SearchRuleRequest>?=null,
    val rules: MutableSet<SearchRuleRequest>,
    val assigns: List<Assign>?=null,
//    val receiver: Assign,
    val creator: Long
)

data class Assign (
    val user_id: String,
//    val username: String,
    val order: Int? = 0
)

data class CreateProjectRequest(
    val key: String,
    val name: String,
    val description: String,
    val owner: Long
)

data class processApporovalFirewallRequest (
    val task: Long,
    val assignee: Long,
    @Enumerated(EnumType.STRING) val status: AssignStatus
)