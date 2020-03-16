package app.ssnc.io.oasis.util

import app.ssnc.io.oasis.util.wallbrain.WallBrainRestApiClient
import mu.KLogging
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component

@Component
class WallBrainHelper (
    @Value("\${wallbrain.ws.baseurl}")
    var baseUrl: String,
    @Value("\${wallbrain.ws.api-user-id}")
    val apiUserId: String,
    @Value("\${wallbrain.ws.api-user-password}")
    val apiUserPasswd: String
) {
    companion object : KLogging()

//    private var connMgr: PoolingHttpClientConnectionManager? = null
//    private var requestConfig: RequestConfig? = null
//    private val MAX_TIMEOUT = 7000
    private var apiClient: WallBrainRestApiClient? = null

    init {
        // 연결 pool 생성
//        connMgr = PoolingHttpClientConnectionManager()
//        // pool 크기
//        connMgr!!.maxTotal = 100
//        connMgr!!.defaultMaxPerRoute = connMgr!!.maxTotal
//
//        val configBuilder = RequestConfig.custom()
//        // 연결 초과 시간
//        configBuilder.setConnectTimeout(MAX_TIMEOUT)
//        // 읽기 시간 초과 설정
//        configBuilder.setSocketTimeout(MAX_TIMEOUT)
//        // 인스턴스 초과 시간 설정
//        configBuilder.setConnectionRequestTimeout(MAX_TIMEOUT)
//        // 연결 가능 테스트
//        configBuilder.setStaleConnectionCheckEnabled(true)
//        requestConfig = configBuilder.build()
        apiClient = WallBrainRestApiClient()

        //apiClient!!.setTarget(baseUrl, 0)
    }




}