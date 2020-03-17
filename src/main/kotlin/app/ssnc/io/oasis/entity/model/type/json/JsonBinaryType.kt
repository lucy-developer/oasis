package app.ssnc.io.oasis.entity.model.type.json

import com.vladmihalcea.hibernate.type.json.internal.JsonBinarySqlTypeDescriptor
import com.vladmihalcea.hibernate.type.json.internal.JsonTypeDescriptor
import org.hibernate.type.AbstractSingleColumnStandardBasicType
import org.hibernate.usertype.DynamicParameterizedType
import java.util.*


class JsonBinaryType : AbstractSingleColumnStandardBasicType<Any?>(JsonBinarySqlTypeDescriptor.INSTANCE, JsonTypeDescriptor()), DynamicParameterizedType {
    override fun getName(): String {
        return "jsonb"
    }

    override fun setParameterValues(parameters: Properties?) {
        (javaTypeDescriptor as JsonTypeDescriptor).setParameterValues(parameters)
    }
}