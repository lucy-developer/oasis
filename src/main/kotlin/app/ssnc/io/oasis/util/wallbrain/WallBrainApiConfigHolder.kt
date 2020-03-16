package app.ssnc.io.oasis.util.wallbrain;

import lombok.extern.slf4j.Slf4j
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component


@Component
@Slf4j
class WallBrainApiConfigHolder(
    @Value("\${wallbrain.ws.baseurl}")
    var baseUrl: String,
    @Value("\${wallbrain.ws.api-user-id}")
    val apiUserId: String,
    @Value("\${wallbrain.ws.api-user-password}")
    val apiUserPasswd: String
) {
    fun getUserCredential() : String {
        return String.format("%s:%s", apiUserId, apiUserPasswd)
    }

    fun setBaseUrl(host: String, port: Int) {
        baseUrl = String.format("http://%s:%d/wallbrain-ws/api/", host, port)
    }
}
