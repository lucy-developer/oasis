package app.ssnc.io.oasis.config

object SecurityConfig {
    const val TOKEN_HEADER = "Authorization"
    const val TOKEN_TYPE = "Bearer"

    const val TOKEN_EXPIRATION_TIME = 7L * 24 * 60 * 60 * 1000

    // FIXME: Get secret key from the configuration server.
    const val TOKEN_SECRET_KEY = "99861D1274C4D5F554D4F619EC479"

    const val PASSWORD_STRENGTH = 12
}