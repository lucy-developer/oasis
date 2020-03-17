package app.ssnc.io.oasis.config

import app.ssnc.io.oasis.entity.model.User
import com.google.common.collect.Lists
//import org.bialydunajec.authorization.server.api.dto.UserDetailsDto
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpHeaders
import springfox.documentation.builders.ApiInfoBuilder
import springfox.documentation.builders.ParameterBuilder
import springfox.documentation.builders.PathSelectors
import springfox.documentation.builders.RequestHandlerSelectors
import springfox.documentation.schema.ModelRef
import springfox.documentation.service.*
import springfox.documentation.spi.DocumentationType
import springfox.documentation.spi.service.contexts.SecurityContext
import springfox.documentation.spring.web.plugins.Docket
import springfox.documentation.swagger.web.SecurityConfiguration
import springfox.documentation.swagger.web.SecurityConfigurationBuilder
import springfox.documentation.swagger2.annotations.EnableSwagger2
import java.util.*

@Configuration
@EnableSwagger2
class SwaggerConfig {
    private val globalOperationHeaders: List<Parameter>
        get() = listOf(authorizationHeader)

    private val authorizationHeader: Parameter
        get() = ParameterBuilder()
            .name(HttpHeaders.AUTHORIZATION)
            .description("Header for authentication preceded by 'bearer' keyword.")
            .modelRef(ModelRef("string"))
            .parameterType(HEADER_PARAMETER_TYPE)
            .required(false)
            .build()

    @Bean
    fun api(): Docket {
        return Docket(DocumentationType.SWAGGER_2)
            .apiInfo(apiInfo())
            .globalOperationParameters(globalOperationHeaders)
            .ignoredParameterTypes(User::class.java)
            .select()
            .apis(RequestHandlerSelectors.any())
            .build()
    }

    private fun apiInfo(): ApiInfo {
        return ApiInfoBuilder()
            .title("OASIS - REST Api!")
            .version("0.0.1")
            .build();
    }

    companion object {
        private val HEADER_PARAMETER_TYPE = "header"
    }
}