package app.ssnc.io.oasis.entity.model.enum

enum class AuditStatus(val value: Int, val desc: String) {
    PENDING(0, "승인 대기"),
    APPROVAL(1, "승인 진행"),
    CONFIRMED(2, "완료")
}

enum class AssignStatus(val value: Int, val desc: String) {
    PENDING(0, "대기"),
    APPROVED(1, "승인"),
    REJECT(2, "반려")
}