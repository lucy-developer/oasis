package app.ssnc.io.oasis.handler.firewall.entity

import app.ssnc.io.oasis.entity.model.enum.Protocol

data class SearchRuleReq (
    val srcAddr: String,
    val dstAddr: String,
    val dstPort: String,
    val protocol: String,
    val startDate: String,
    val expireDate: String,
    val withDiscovery: String = "true"
)
