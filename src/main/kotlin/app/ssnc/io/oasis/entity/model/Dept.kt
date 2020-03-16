package app.ssnc.io.oasis.entity.model

import app.ssnc.io.oasis.entity.model.common.Auditable
import app.ssnc.io.oasis.util.equalsBuilder
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonInclude
import java.io.Serializable
import java.util.*
import javax.persistence.*


@Entity
@Table(
        schema = "customer", name = "dept"
//    ,indexes = [Index(name = "idx1_product", columnList = "name", unique = true)]
)
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
data class Dept(
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        var id: Long = 0,

        @Column(name = "name")
        var name: String,

        @ManyToOne(optional = true, fetch = FetchType.LAZY, cascade = arrayOf(CascadeType.ALL))
        @JoinColumn(name = "parent_dept_id")
        var parentDept: Dept? = null,

//    @OneToMany(mappedBy = "parentDept", fetch = FetchType.LAZY, orphanRemoval = true, cascade =  arrayOf(CascadeType.ALL))
//    @OneToMany(mappedBy = "parentDept" , cascade = [CascadeType.ALL] )
//    @Where()
//    var childDept : MutableSet<Dept>? = null,

        @Column(name="leader_id", nullable=true, insertable = true, updatable = true)
        var leaderId: Long? = null

) : Auditable(), Serializable {
    override fun equals(other: Any?): Boolean =
            equalsBuilder(
                    other,
                    Dept::name
            )

    override fun hashCode(): Int =
            Objects.hash(name)

    @OneToOne(fetch = FetchType.LAZY, cascade = [CascadeType.ALL])
    @JoinColumn(name = "leader_id",referencedColumnName="id", insertable = false, updatable = false)
    var leader: User? = null
}