package app.ssnc.io.oasis.entity.model.type.json

import app.ssnc.io.oasis.util.JacksonUtil
import org.hibernate.type.descriptor.WrapperOptions
import org.hibernate.type.descriptor.java.AbstractTypeDescriptor
import org.hibernate.type.descriptor.java.MutableMutabilityPlan
import org.hibernate.usertype.DynamicParameterizedType
import org.hibernate.usertype.DynamicParameterizedType.PARAMETER_TYPE
import java.util.Properties;


@Suppress("UNCHECKED_CAST")
abstract class JsonTypeDescriptor : AbstractTypeDescriptor<Any>(Any::class.java, object : MutableMutabilityPlan<Any>() {
    override fun deepCopyNotNull(value: Any): Any {
        return JacksonUtil.clone(value)
    }
}), DynamicParameterizedType {
    private var jsonObjectClass: Class<Any>? = null

    override fun setParameterValues(parameters: Properties) {
        jsonObjectClass = (parameters[PARAMETER_TYPE] as DynamicParameterizedType.ParameterType).returnedClass
    }

    override fun areEqual(one: Any?, another: Any?): Boolean {
        if (one === another) {
            return true
        }
        return if (one == null || another == null) {
            false
        } else JacksonUtil.toJsonNode(JacksonUtil.toString(one)) ==
            JacksonUtil.toJsonNode(JacksonUtil.toString(another))
    }

    override fun toString(value: Any): String {
        return JacksonUtil.toString(value)
    }

    override fun fromString(string: String): Any {
        return jsonObjectClass?.let { JacksonUtil.fromString(string, it) }!!
    }

//    override fun <X : Any?> unwrap(value: Any?, type: Class<X>?, options: WrapperOptions?): X {
//        if (value == null) {
//            return null
//        }
//        if (String::class.java.isAssignableFrom(type)) {
//            return toString(value) as X
//        }
//        if (Any::class.java.isAssignableFrom(type)) {
//            return JacksonUtil.toJsonNode(toString(value)) as X
//        }
//        throw unknownUnwrap(type)
//    }

    override fun <X : Any?> unwrap(value: Any?, type: Class<X>?, options: WrapperOptions?): X? {
        if (value == null) {
            return null
        }

        return fromString(value.toString()) as X
    }
}