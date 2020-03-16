package app.ssnc.io.oasis.entity.model

import app.ssnc.io.oasis.entity.model.enum.UserRole
import org.hibernate.annotations.NaturalId
import javax.persistence.*

@Entity
@Table(
        schema = "customer", name = "sys_user_role")
data class SysUserRole (
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = -1,

        @Enumerated(EnumType.STRING)
        @NaturalId
        @Column(name = "name", length = 60)
        val name: UserRole
)