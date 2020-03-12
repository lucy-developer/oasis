package app.ssnc.io.oasis.model.common

import app.ssnc.io.oasis.util.DateUtil
import com.vladmihalcea.hibernate.type.array.IntArrayType
import com.vladmihalcea.hibernate.type.array.StringArrayType
import com.vladmihalcea.hibernate.type.json.JsonBinaryType
import com.vladmihalcea.hibernate.type.json.JsonNodeBinaryType
import com.vladmihalcea.hibernate.type.json.JsonStringType
import com.vladmihalcea.hibernate.type.json.JsonNodeStringType
import org.hibernate.annotations.TypeDef
import org.hibernate.annotations.TypeDefs
import org.springframework.data.annotation.CreatedBy
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedBy
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import org.springframework.format.annotation.DateTimeFormat
import java.time.LocalDateTime
import javax.persistence.Column
import javax.persistence.EntityListeners
import javax.persistence.MappedSuperclass

@MappedSuperclass
@EntityListeners(AuditingEntityListener::class)
@TypeDefs(
    TypeDef(name = "string-array", typeClass = StringArrayType::class),
    TypeDef(name = "int-array", typeClass = IntArrayType::class),
    TypeDef(name = "json", typeClass = JsonStringType::class),
    TypeDef(name = "jsonb", typeClass = JsonBinaryType::class),
    TypeDef(name = "jsonb-node", typeClass = JsonNodeBinaryType::class),
    TypeDef(name = "json-node", typeClass = JsonNodeStringType::class)
)
open class Auditable {
    @CreatedBy
    @Column(name = "create_by" ,nullable = true, updatable = false)
    var createdBy: String? = null

    @CreatedDate
    @Column(name = "create_date" ,nullable = true, updatable = false)
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    var createDate: LocalDateTime = DateUtil.stringToLocalDateTime(DateUtil.nowDateTime)

    @LastModifiedBy
    @Column(name = "update_by", nullable = true)
    var updateBy: String? = null

    @LastModifiedDate
    @Column(name = "update_date", nullable = true)
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    var UpdateDate: LocalDateTime = DateUtil.stringToLocalDateTime(DateUtil.nowDateTime)
}