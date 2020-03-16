package app.ssnc.io.oasis.security

import app.ssnc.io.oasis.entity.model.User
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import java.util.*
import java.util.stream.Collectors

class UserPrincipal(
        val user: User,
        private val authorities: Collection<GrantedAuthority>
) : UserDetails {
    companion object {
        fun create(user: User) : UserPrincipal {
            val authorities: List<GrantedAuthority> = user.roles!!
                    .stream()
                    .map({ role -> SimpleGrantedAuthority(role.name.toString()) })
                    .collect(Collectors.toList<GrantedAuthority>())

            return UserPrincipal(user, authorities)
        }
    }

    //    override fun getAuthorities(): List<GrantedAuthority> = authorities
    override fun getAuthorities(): Collection<GrantedAuthority> {
        return authorities
    }

    override fun isEnabled(): Boolean = true

    override fun getUsername(): String = user.username

    override fun getPassword(): String = user.password

    override fun isCredentialsNonExpired(): Boolean = true

    override fun isAccountNonExpired(): Boolean = true

    override fun isAccountNonLocked(): Boolean = true

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || this::class != other::class) return false
        val that = other as UserPrincipal
        return Objects.equals(user.id, that.user.id)
    }

    override fun hashCode(): Int {
        return Objects.hash(user.id)
    }

//    fun grantRole(user: UserRole) {
//        authorities.add(user.asAuthorityFor(this))
//    }
}

//fun UserPrincipal.isUser(): Boolean {
//	return this.role.equals(UserRole.USER)
//}