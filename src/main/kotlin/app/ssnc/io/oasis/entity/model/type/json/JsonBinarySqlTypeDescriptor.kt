package app.ssnc.io.oasis.entity.model.type.json

import com.fasterxml.jackson.databind.JsonNode;
import org.hibernate.type.descriptor.ValueBinder;
import org.hibernate.type.descriptor.ValueExtractor;
import org.hibernate.type.descriptor.WrapperOptions;
import org.hibernate.type.descriptor.java.JavaTypeDescriptor;
import org.hibernate.type.descriptor.sql.BasicBinder;
import org.hibernate.type.descriptor.sql.BasicExtractor;
import org.hibernate.type.descriptor.sql.SqlTypeDescriptor;

import java.sql.*;


class JsonBinarySqlTypeDescriptor : SqlTypeDescriptor {
    override fun getSqlType(): Int {
        return Types.OTHER
    }

    override fun canBeRemapped(): Boolean {
        return true
    }

    override fun <X> getExtractor(javaTypeDescriptor: JavaTypeDescriptor<X>): ValueExtractor<X> {
        return object : BasicExtractor<X>(javaTypeDescriptor, this) {
            @Throws(SQLException::class)
            override fun doExtract(rs: ResultSet, name: String, options: WrapperOptions): X {
                return javaTypeDescriptor.wrap(rs.getObject(name), options)
            }

            @Throws(SQLException::class)
            override fun doExtract(statement: CallableStatement, index: Int, options: WrapperOptions): X {
                return javaTypeDescriptor.wrap(statement.getObject(index), options)
            }

            @Throws(SQLException::class)
            override fun doExtract(statement: CallableStatement, name: String, options: WrapperOptions): X {
                return javaTypeDescriptor.wrap(statement.getObject(name), options)
            }
        }
    }

    override fun <X> getBinder(javaTypeDescriptor: JavaTypeDescriptor<X>): ValueBinder<X> {
        return object : BasicBinder<X>(javaTypeDescriptor, this) {
            @Throws(SQLException::class)
            override fun doBind(st: PreparedStatement, value: X, index: Int, options: WrapperOptions) {
                st.setObject(index, javaTypeDescriptor.unwrap(value, JsonNode::class.java, options), sqlType)
            }

            @Throws(SQLException::class)
            override fun doBind(callableStatement: CallableStatement, x: X, s: String, wrapperOptions: WrapperOptions) {
            }
        }
    }

    companion object {
        val INSTANCE = JsonBinarySqlTypeDescriptor()
    }
}