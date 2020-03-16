package app.ssnc.io.oasis.util.web

import org.springframework.http.HttpMethod

abstract class RestExchange<out REQ>(val url: String = "",
                                     val httpMethod: HttpMethod = HttpMethod.GET,
                                     val username: String = "",
                                     val password: String = "",
                                     val requestObject: REQ,
                                     val uriParams: Map<String, String> = emptyMap()
)