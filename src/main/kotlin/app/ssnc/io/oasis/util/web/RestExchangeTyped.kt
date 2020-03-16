package app.ssnc.io.oasis.util.web

import org.springframework.core.ParameterizedTypeReference
import org.springframework.http.HttpMethod

class RestExchangeTyped<out REQ, RES>(url: String,
                                      httpMethod: HttpMethod = HttpMethod.GET,
                                      username: String = "",
                                      password: String = "",
                                      requestObject: REQ,
                                      uriParams: Map<String, String> = emptyMap(),
                                      val typeReference: ParameterizedTypeReference<RES>):
    RestExchange<REQ>(url, httpMethod, username, password, requestObject, uriParams)