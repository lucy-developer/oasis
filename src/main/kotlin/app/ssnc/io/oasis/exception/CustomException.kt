package app.ssnc.io.oasis.exception

import org.springframework.http.HttpStatus

class CustomException(
        override val message: String,
        val status: HttpStatus
) : RuntimeException(message)

class UserInputValidationException(
        message: String,
        val httpCode : Int = 400
) : RuntimeException(message)

class PreconditionException(
        message: String,
        val httpCode : Int = 412
) : RuntimeException(message)

class UniquenessFieldException(
        message: String,
        val httpCode : Int = 409
) : RuntimeException(message)