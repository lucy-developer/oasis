package app.ssnc.io.oasis.util.web

import org.springframework.http.HttpMethod
import kotlin.reflect.KClass

class RestExchangeBasic<out REQ, RES: Any>(url: String,
                                           httpMethod: HttpMethod = HttpMethod.GET,
                                           username: String = "",
                                           password: String = "",
                                           requestObject: REQ,
                                           uriParams: Map<String, String> = emptyMap(),
                                           val responseType: KClass<RES>):
    RestExchange<REQ>(url, httpMethod, username, password, requestObject, uriParams)