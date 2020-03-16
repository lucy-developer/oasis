package app.ssnc.io.oasis.util.web

import org.apache.commons.lang3.StringUtils
import org.springframework.http.HttpStatus
import org.springframework.http.client.ClientHttpResponse
import org.springframework.web.client.ResponseErrorHandler

class WebServiceErrorHandler(val url: String): ResponseErrorHandler {
    var status: HttpStatus = HttpStatus.OK
    var message: String = ""

    override fun hasError(clientHttpResponse: ClientHttpResponse): Boolean {
        return when (clientHttpResponse.statusCode.series()) {
            HttpStatus.Series.CLIENT_ERROR, HttpStatus.Series.SERVER_ERROR -> true

            else -> false
        }
    }

    override fun handleError(clientHttpResponse: ClientHttpResponse) {
        val serviceReply = clientHttpResponse.headers.getFirst("service_reply")
        status = clientHttpResponse.statusCode
        message = "Web service error calling $url:\n${clientHttpResponse.statusText} ($status)"

        if  (StringUtils.isNotEmpty(serviceReply)) {
            message += " - $serviceReply"
        }

        throw WebServiceException(status, message)
    }
}