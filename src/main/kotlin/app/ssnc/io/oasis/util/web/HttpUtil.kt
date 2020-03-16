package app.ssnc.io.oasis.util.web

import mu.KLogging
import org.apache.commons.codec.binary.Base64
import org.apache.commons.lang3.StringUtils
import org.postgresql.shaded.com.ongres.scram.common.ScramStringFormatting.base64Encode
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import java.io.UnsupportedEncodingException
import java.nio.charset.Charset

class HttpUtil {
/*
    fun <E> createHttpEntity(body: E?): HttpEntity<E> = createHttpEntity(body, null, null, null)
    fun <E> createHttpEntity(body: E?, username: String, password: String): HttpEntity<E> = createHttpEntity(body, username, password, null)
    fun <E> createHttpEntity(body: E?, contentType: MediaType): HttpEntity<E> = createHttpEntity(body, null, null, contentType)
*/
    companion object : KLogging()

    fun <E> createHttpEntity(body: E? = null, username: String? = "", password: String? = "", contentType: MediaType? = MediaType.APPLICATION_JSON): HttpEntity<E> {
        val headers = HttpHeaders()

        if (null != contentType) {
            headers.contentType = contentType
        }

        if (StringUtils.isNotEmpty(username) && StringUtils.isNotEmpty(password)) {
            val auth = "$username:$password"
            val encodedAuth = toBase64Encode(auth)
            headers.set("Authorization", "Basic $encodedAuth")
        }

        return if (body != null) HttpEntity(body, headers) else HttpEntity(headers)
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
}