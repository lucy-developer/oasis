package app.ssnc.io.oasis.entity.model

import app.ssnc.io.oasis.entity.model.common.Auditable
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonInclude
import org.hibernate.annotations.DynamicUpdate
import java.io.Serializable
import javax.persistence.*
import javax.validation.constraints.Size

private const val PROJECT_GENERATOR = "ProjectGenerator"

@Entity
@Table(
    schema = "core", name = "project"
//    ,indexes = [Index(name = "idx1_product", columnList = "name", unique = true)]
)
@DynamicUpdate
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
data class Project (
    @Id
    @SequenceGenerator(name = PROJECT_GENERATOR, sequenceName = "PROJECT_SEQ", initialValue = 1, allocationSize = 1)
    @GeneratedValue(generator = PROJECT_GENERATOR)
    var id: Long? = null,

    @Size(min = 2, max = 4, message = "Invalid Project Key length: interval is [2, 4]")
    @Column( name = "key", unique = true, insertable = true, updatable = false)
    var key: String,

    @Column( name = "name")
    var name: String,

    @Column( name = "description")
    var description: String,

    @ManyToOne
    @JoinColumn(name = "owner_id")
    val owner: User

): Auditable(), Serializable {
}