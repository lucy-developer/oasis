package app.ssnc.io.oasis.model

import app.ssnc.io.oasis.model.enum.EmployeePosition
import app.ssnc.io.oasis.model.enum.EmployeeStatus
import app.ssnc.io.oasis.util.DateUtil
import com.fasterxml.jackson.annotation.JsonIgnore
import org.springframework.format.annotation.DateTimeFormat
import java.io.Serializable
import java.time.LocalDate
import javax.persistence.*
import javax.validation.constraints.Size

@Entity
@Table(
        schema = "customer", name = "employee",
        indexes = [
            Index(name = "idx1_employee", columnList = "email", unique = true)
        ]
)
data class User (
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id", unique = true, nullable = false)
        var id: Long,

        @Size(min = 6, max = 255, message = "Invalid email length: interval is [4, 255]")
        @Column(name = "email", unique = true, nullable = false, updatable = false, insertable = true)
        var email: String,

        @get:JsonIgnore
        @field:Size(min = 8, message = "Invalid password length: interval is [8, 255]")
        @field:Column(name = "password", unique = false, nullable = false)
        var password: String,

        @Size(min = 2, max = 255, message = "Invalid name length: interval is [2, 255]")
        @Column(name = "username", unique = false, nullable = false)
        var username: String,

        @Enumerated(EnumType.STRING)
        @Column(name = "status", unique = false, nullable = true)
        var status: EmployeeStatus? = null,

        @Size(min = 10, max = 15, message = "Invalid mobile1 length: interval is [10, 15]")
        @Column(name = "mobile", unique = false, nullable = false)
        var mobile: String,

//    @Size(min = 9, max = 15, message = "Invalid tel length: interval is [9, 15]")
        @Column(name = "tel", unique = false, nullable = true)
        var tel: String? = null,

        @Column(name = "sex", unique = false, nullable = true)
        var sex: String? = null,

        @Column(name = "birthday", unique = false, nullable = true)
        @DateTimeFormat(pattern="yyyy-MM-dd")
        var birthday: LocalDate? = null,

        @Column(name = "join_date", unique = false, nullable = true)
        @DateTimeFormat(pattern="yyyy-MM-dd")
        var joinDate: LocalDate = DateUtil.stringToLocalDate("9999-12-31"),

        @Column(name = "leave_date", unique = false, nullable = true)
        @DateTimeFormat(pattern="yyyy-MM-dd")
        var leaveDate: LocalDate? = null,

        @Enumerated(EnumType.STRING)
        @Column(name = "position", unique = false, nullable = true)
        var position: EmployeePosition? = null,

//    @Enumerated(EnumType.STRING)
//    @Size(max = 10)
//    @Column(name = "role", unique = false, nullable = false)

        @ManyToMany(fetch = FetchType.EAGER)
        @JoinTable(name = "users_roles", schema = "customer",
                joinColumns = [JoinColumn(name = "user_id",referencedColumnName ="id" )],
                inverseJoinColumns = [JoinColumn(name = "role_id",referencedColumnName = "id")])
        var roles:Collection<SysUserRole> = HashSet(),

        @ManyToOne(fetch = FetchType.LAZY, cascade = [CascadeType.ALL])
        @JoinColumn(name = "dept_id", unique = false, nullable = true, insertable = true, updatable = true)
        var dept: Dept? = null

): Serializable{
}