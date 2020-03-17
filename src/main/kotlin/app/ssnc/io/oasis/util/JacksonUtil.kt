package app.ssnc.io.oasis.util

import com.fasterxml.jackson.core.JsonProcessingException
import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import java.io.IOException


class JacksonUtil {
    companion object {
        private val mapper: ObjectMapper = ObjectMapper()

        fun clone(obj: Any): Any {
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
            val clone = mapper.writeValueAsString(obj)
            val type = mapper.typeFactory.constructType(obj::class.java)
            return mapper.readValue(clone, type)
        }

        fun toJsonNode(value: String): JsonNode {
            return try {
                mapper.readTree(value)
            } catch (e: IOException) {
                throw IllegalArgumentException(e)
            }
        }

        fun fromString(string: String, clazz: Class<Any>): Any {
            return try {
                mapper.readValue(string, clazz)
            } catch (e: IOException) {
                throw java.lang.IllegalArgumentException("The given string value: $string cannot be transformed to Json object")
            }
        }

        fun toString(value: Any) : String {
            return try {
                mapper.writeValueAsString(value)
            } catch (e: JsonProcessingException) {
                throw java.lang.IllegalArgumentException("The given Json object value: $value cannot be transformed to a String")
            }
        }
    }
}