package app.ssnc.io.oasis.entity.request

data class LoginRequest (
    val email: String,
    val password: String,
    val admin_yn: String
)
