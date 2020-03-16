package app.ssnc.io.oasis.handler.firewall.entity

data class SearchRuleRes (
    val botId: String,
    val chatroomId: String,
    val reqUserKnoxId: String,
    val resultStatus: String,
    val srcAddr: String,
    val dstAddr: String,
    val dstPort: String,
    val protocol: String,
    val expireDate: String,
    val startDate: String,
    val complianceComment: String,
    val earlistExpireDate: String? = null,
    val withDiscovery: String,
    val historySequence: Int,
    val asyncMode: Boolean,
    val intent: String,
    val compliance: Boolean,
    val firewallIds: List<String>,
    val allErrorSession: Boolean,
    val firewallPath: List<FirewallPath>?
)

data class FirewallPath (
    val ruleId: String,
    val firewallId: String,
    val status: String,
    val ruleStatus: String,
    val operator: String,
    val historySequence: Int,
    val rulePriority: String? = null,
    val ruleComment: String? = null,
    val ruleExpireDay: String,
    val analyzerResult: String? = null,
    val analyzerDescription: String? = null,
    val permanent: Boolean,
    val validTcpSession: Boolean,
    val error: Boolean
)
