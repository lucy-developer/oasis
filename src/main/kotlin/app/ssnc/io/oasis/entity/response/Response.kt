package app.ssnc.io.oasis.entity.response

import app.ssnc.io.oasis.entity.model.User

data class LoginResponse (
    val token_type: String,
    val access_token: String,
    val refresh_token: String,
    val expires_in: Long,
    val id_token: String,
    val user: User
)
