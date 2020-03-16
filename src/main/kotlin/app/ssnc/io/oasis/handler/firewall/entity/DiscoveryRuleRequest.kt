package app.ssnc.io.oasis.handler.firewall.entity

import app.ssnc.io.oasis.entity.model.enum.RuleActions
import app.ssnc.io.oasis.entity.model.enum.Protocol
import java.time.LocalDate
import java.time.LocalDateTime
import javax.persistence.EnumType
import javax.persistence.Enumerated

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
    val comment: String?
)