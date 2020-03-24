package app.ssnc.io.oasis.entity.model

import app.ssnc.io.oasis.entity.model.common.Auditable
import app.ssnc.io.oasis.entity.model.enum.AssignStatus
import app.ssnc.io.oasis.entity.model.enum.AuditStatus
import app.ssnc.io.oasis.entity.request.SearchRuleRequest
import app.ssnc.io.oasis.util.Extension.equalsBuilder
import app.ssnc.io.oasis.util.Extension.toStringBuilder
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonInclude
import org.hibernate.annotations.DynamicUpdate
import org.hibernate.annotations.Type
import java.io.Serializable
import java.util.*
import javax.persistence.*

private const val TASK_GENERATOR = "TaskGenerator"
private const val TASK_ASSIGN_GENERATOR = "TaskAssignGenerator"

@Entity
@Table(
    schema = "core", name = "task"
//    ,indexes = [Index(name = "idx1_product", columnList = "name", unique = true)]
)
@DynamicUpdate
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
data class Task(
    @Id
    @SequenceGenerator(name = TASK_GENERATOR, sequenceName = "TASK_SEQ", initialValue = 1, allocationSize = 1)
    @GeneratedValue(generator = TASK_GENERATOR)
    var id: Long? = null,

    @Column(name = "key", unique = true, nullable = false)
    val key: String,

    @Column(name = "project_seq")
    var projectSeq: Long,

    @Column(name = "title")
    var title: String,

    @Enumerated(EnumType.STRING)
    @Column(name = "status", unique = false, nullable = false, insertable = true, updatable = true)
    var status: AuditStatus = AuditStatus.PENDING,

    @ManyToOne(fetch = FetchType.LAZY, cascade = [CascadeType.ALL])
    @JoinColumn(name = "creator_id", unique = false, nullable = false, insertable = true, updatable = true)
    var creator: User

//    @Type(type = "jsonb")
//    @Column(name = "details", columnDefinition = "jsonb")
//    var details: MutableList<SearchRuleRequest> = mutableSetOf()

//    @Column(name = "target_id", nullable = false)
//    var targetId: Long? = null
//    @Enumerated(EnumType.STRING)
//    var priority: TaskPriority = TaskPriority.MEDIUM,

) : Auditable(), Serializable {

    override fun toString() =
        toStringBuilder(
            Task::id,
            Task::key
        )

    override fun equals(other: Any?): Boolean =
        equalsBuilder(
            other,
            Task::id,
            Task::key
        )

    override fun hashCode(): Int =
        Objects.hash(id, key)
}

@Entity
@Table(
    schema = "core", name = "task_assign"
//    ,indexes = [Index(name = "idx1_product", columnList = "name", unique = true)]
)
@DynamicUpdate
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
data class TaskAssign(
    @Id
//    @SequenceGenerator(name = TASK_ASSIGN_GENERATOR, sequenceName = "TASK_ASSIGN_SEQ", initialValue = 1, allocationSize = 1)
//    @GeneratedValue(generator = TASK_ASSIGN_GENERATOR)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    var id: Long? = null,

    @Column(name = "project_seq")
    var projectSeq: Long,

    @Column(name = "order_no")
    var orderNo: Int?,

    @Enumerated(EnumType.STRING)
    @Column( name = "status", unique = false, nullable = false, insertable = true, updatable = true)
    var status: AssignStatus = AssignStatus.PENDING,

    @OneToOne(fetch = FetchType.LAZY, cascade = [CascadeType.ALL])
    @JoinColumn(name = "creator_id", unique = false, nullable = false, insertable = true, updatable = true)
    var assign: User

) : Auditable(), Serializable {

    override fun toString() =
        toStringBuilder(
            TaskAssign::projectSeq,
            TaskAssign::orderNo
        )

    override fun equals(other: Any?): Boolean =
        equalsBuilder(
            other,
            TaskAssign::projectSeq,
            TaskAssign::orderNo
        )

    override fun hashCode(): Int =
        Objects.hash(projectSeq, orderNo)
}