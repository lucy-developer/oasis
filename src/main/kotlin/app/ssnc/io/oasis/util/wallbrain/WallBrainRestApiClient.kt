package app.ssnc.io.oasis.util.wallbrain

//import org.springframework.web.client.exchange
import app.ssnc.io.oasis.handler.firewall.entity.SearchRuleReq
import app.ssnc.io.oasis.handler.firewall.entity.SearchRuleRes
import com.sds.wallbrain.base.FirewallInfoVo
import com.sds.wallbrain.base.FirewallRuleSessionInfoVo
import com.sds.wallbrain.base.RuleSetGroupInfoVo
import com.sds.wallbrain.base.converter.JsonConverter
import lombok.extern.slf4j.Slf4j
import mu.KLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Lazy
import org.springframework.core.ParameterizedTypeReference
import org.springframework.http.*
import org.springframework.http.client.ClientHttpRequestFactory
import org.springframework.http.client.SimpleClientHttpRequestFactory
import org.springframework.http.converter.HttpMessageConverter
import org.springframework.http.converter.StringHttpMessageConverter
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter
import org.springframework.stereotype.Component
import org.springframework.util.LinkedMultiValueMap
import org.springframework.web.client.RestTemplate
import org.springframework.web.util.UriComponentsBuilder
import java.io.UnsupportedEncodingException
import java.util.*
import java.util.List
import javax.xml.bind.DatatypeConverter

@Component
@Slf4j
class WallBrainRestApiClient {

    companion object : KLogging()

    private val ApiSubUrl = "%s.json"

    @Autowired
    @Lazy
    private val configHolder: WallBrainApiConfigHolder? = null

    @Throws(UnsupportedEncodingException::class)
    private fun base64Encode(message: String): String {

        return DatatypeConverter.printBase64Binary(message.toByteArray(charset("UTF-8")))
    }

    fun toBase64Encode(credential: String): String {
        var base64Encoded = credential

        try {
            base64Encoded = base64Encode(credential)
        } catch (e: UnsupportedEncodingException) {
            logger.error("can not encoding base64 : ", credential, e)
        }

        return base64Encoded
    }

    fun clientHttpRequestFactory(): ClientHttpRequestFactory {
        val factory = SimpleClientHttpRequestFactory()
        factory.setReadTimeout(30 * 60 * 1000)
        factory.setConnectTimeout(5000)
        return factory
    }

    //RestTemplate restTemplate = new RestTemplate();
    fun getRestTemplate() : RestTemplate {
        val restTemplate = RestTemplate(clientHttpRequestFactory())
        val messageConverters = ArrayList<HttpMessageConverter<*>>()

        run {
            val converter = StringHttpMessageConverter()
            messageConverters.add(converter)
        }

        run {
            val supportedjsonMediaTypes = ArrayList<MediaType>()

            supportedjsonMediaTypes.add(MediaType.APPLICATION_JSON)
            supportedjsonMediaTypes.add(MediaType.TEXT_HTML)

            val converter = MappingJackson2HttpMessageConverter()

            converter.objectMapper = JsonConverter.getObjectMapper(false)
            converter.supportedMediaTypes = supportedjsonMediaTypes
            messageConverters.add(converter)
        }

        restTemplate.messageConverters = messageConverters
        return restTemplate
    }

    fun getBaseUrl() : String {
        return configHolder!!.baseUrl
    }

    fun getReqeustHeader(userCredential: String): HttpHeaders {
        val requestHeaders = HttpHeaders()
        requestHeaders.set("Authorization", "Basic " + toBase64Encode(userCredential))
        requestHeaders.add("Content-Type", MediaType.APPLICATION_JSON_VALUE + "; charset=UTF-8");
        return requestHeaders
    }

    fun getRequestHeader(userCredential: String) {
        if (configHolder != null) {
            return getRequestHeader(configHolder.getUserCredential())
        }
    }

    fun getRequestWithCredential(): HttpEntity<String> {
        val parameters = LinkedMultiValueMap<String, String>()
        parameters.add("Authorization", "Basic "+ toBase64Encode(configHolder!!.getUserCredential()))
        parameters.add("Content-Type", MediaType.APPLICATION_JSON_VALUE + "; charset=UTF-8")

        return HttpEntity<String>(parameters)
    }

    fun getFirewalls(): List<FirewallInfoVo>? {
        val apiUrl = "/firewall/all/list"
        val restTemplate = getRestTemplate()
        val request = getRequestWithCredential()

        val response = restTemplate.exchange(
            configHolder!!.baseUrl + String.format(ApiSubUrl, apiUrl), HttpMethod.GET, request,
            object : ParameterizedTypeReference<List<FirewallInfoVo>>() {

            })

        return response.getBody()
    }

    fun searchRuleSetGroup(
        apiUrl: String?,
        params: SearchRuleReq
    ): Array<FirewallRuleSessionInfoVo> {
        val restTemplate = getRestTemplate()
        //val request = getRequestWithCredential()
        val uriComponentBuilder: UriComponentsBuilder = UriComponentsBuilder.fromHttpUrl(
            configHolder!!.baseUrl + String.format(ApiSubUrl, apiUrl))
        val requestHeaders: HttpHeaders =  getReqeustHeader(configHolder.getUserCredential())

        val request = HttpEntity<Any>(
            JsonConverter.convertObjectToJsonString(params, false), requestHeaders)

        val response: ResponseEntity<Array<FirewallRuleSessionInfoVo>> = restTemplate.exchange(
            configHolder.baseUrl + String.format(ApiSubUrl, apiUrl), HttpMethod.POST, request,
            Array<FirewallRuleSessionInfoVo>::class.java
        )
        return response.getBody()!!
    }

}