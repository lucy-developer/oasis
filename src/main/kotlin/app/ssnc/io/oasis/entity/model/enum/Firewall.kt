package app.ssnc.io.oasis.entity.model.enum

enum class Protocol(val type: String, val desc: String) {
    TCP("TCP", "TCP"),
    UDP("UDP", "UDP")
}

enum class RuleActions(val type: String, val desc: String) {
    ALLOW("ALLOW", "ALLOW"),
    DENY("DENY", "DENY")
}