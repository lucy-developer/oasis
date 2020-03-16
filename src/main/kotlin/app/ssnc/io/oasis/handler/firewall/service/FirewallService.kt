package app.ssnc.io.oasis.handler.firewall.service

import app.ssnc.io.oasis.exception.HandleConstraintViolationException
import app.ssnc.io.oasis.exception.UniquenessFieldException
import app.ssnc.io.oasis.handler.firewall.entity.SearchRuleReq
import app.ssnc.io.oasis.handler.firewall.entity.SearchRuleRequest
import app.ssnc.io.oasis.handler.firewall.entity.SearchRuleRes
import app.ssnc.io.oasis.util.DateUtil
import app.ssnc.io.oasis.util.wallbrain.WallBrainRestApiClient
import app.ssnc.io.oasis.util.web.RestClient
import com.sds.wallbrain.base.FirewallRuleSessionInfoVo
import com.sds.wallbrain.base.RuleSetGroupInfoVo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service


@Service
class FirewallService(
    @Value("\${wallbrain.ws.api-user-id}")
    val apiUserId: String,
    @Value("\${wallbrain.ws.api-user-password}")
    val apiUserPasswd: String,
    @Value("\${wallbrain.ws.baseurl")
    val apiUrl: String
) {
    @Autowired
    private lateinit var wallBrainRestApiClient: WallBrainRestApiClient

    @Autowired
    private lateinit var restClient: RestClient

    @Throws(UniquenessFieldException::class, HandleConstraintViolationException::class)
    fun searchRule(request: SearchRuleRequest) {
        //val rule = HashMap<String, String>()
        val searchRule = SearchRuleReq(
            srcAddr = request.src_address,
            dstAddr = request.dest_address,
            dstPort = request.port.toString(),
            protocol = request.protocol.toString(),
            withDiscovery = "true",
            startDate = DateUtil.formatDateToLocalDate(request.start_date, "YYYYMMdd"),
            expireDate = DateUtil.formatDateToLocalDate(request.end_date, "YYYYMMdd")
        )

        val results: Array<FirewallRuleSessionInfoVo> = wallBrainRestApiClient.searchRuleSetGroup("/provision/rule/search", searchRule)

        for (result in results ) {
//            if (result.resultStatus == "notallowed")
//                return

            if (result.resultStatus == "allowed")
                throw UniquenessFieldException("방화벽 중복 등록 요청")

            if (result.isCompliance)
                throw HandleConstraintViolationException(result.complianceComment)
        }


//        val respType = object: ParameterizedTypeReference<RuleSetGroupInfoVo>(){}
//
//        val uriComponentBuilder = UriComponentsBuilder.fromHttpUrl(apiUrl + "provision/rule/search.json")
//
//        val result = restClient.exchange(
//            HttpMethod.GET, apiUrl + "provision/rule/search.json",
//            apiUserId, apiUserPasswd, "",
//            Array<RuleSetGroupInfoVo>::class.java,
//        )
    }



}