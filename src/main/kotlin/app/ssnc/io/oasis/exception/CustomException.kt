package app.ssnc.io.oasis.exception

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

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

@ResponseStatus(HttpStatus.CONFLICT)
class UniquenessFieldException(message: String?) : RuntimeException(message)

@ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
class HandleConstraintViolationException(message: String?) : RuntimeException(message)