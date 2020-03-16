package app.ssnc.io.oasis.config

import com.fasterxml.classmate.TypeResolver
import com.google.common.collect.Lists.newArrayList
import org.joda.time.LocalDate
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.context.request.async.DeferredResult
import springfox.documentation.builders.PathSelectors
import springfox.documentation.builders.RequestHandlerSelectors
import springfox.documentation.builders.ResponseMessageBuilder
import springfox.documentation.schema.AlternateTypeRules.newRule
import springfox.documentation.schema.ModelRef
import springfox.documentation.schema.WildcardType
import springfox.documentation.service.ResponseMessage
import springfox.documentation.spi.DocumentationType
import springfox.documentation.spring.web.plugins.Docket
import springfox.documentation.swagger2.annotations.EnableSwagger2
import java.util.*

/**
 * Created by Pavol Rajzak, Itera.
 */
@Configuration
@EnableSwagger2
open class SwaggerConfig (
    @Value("\${swagger.host-name}")
    val swaggerHost: String
){

//    companion object {
//        //val swaggerProperties = SwaggerConfig::class.java.getResourceAsStream("/swagger.properties")
//        //val properties = Properties()
//
//        fun hostname() : String {
//            //properties.load(swaggerProperties)
//            return swaggerHost
//        }
//    }

    @Autowired
    private lateinit var typeResolver: TypeResolver

    @Bean
    open fun apiDocs(): Docket {
        return Docket(DocumentationType.SWAGGER_2)
            .select()
            .apis(RequestHandlerSelectors.any())
            .paths(PathSelectors.any())
            .build()
            .host(swaggerHost)
            .pathMapping("/")
            .directModelSubstitute(LocalDate::class.java, String::class.java)
            .genericModelSubstitutes(ResponseEntity::class.java).alternateTypeRules(
                newRule(typeResolver.resolve(DeferredResult::class.java,
                    typeResolver.resolve(ResponseEntity::class.java, WildcardType::class.java)),
                    typeResolver.resolve(WildcardType::class.java)))
            .useDefaultResponseMessages(false)
            .globalResponseMessage(RequestMethod.GET, newArrayList<ResponseMessage>(ResponseMessageBuilder().code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .message("500 message").responseModel(ModelRef("Error")).build()))
    }

}