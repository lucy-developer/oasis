package app.ssnc.io.oasis.entity.model.enum

enum class AuditStatus(val value: Int, val desc: String) {
    PENDING(0, "승인 대기"),
    APPROVAL(1, "승인 진행"),
    CONFIRMED(2, "완료")
}