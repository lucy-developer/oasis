package app.ssnc.io.oasis.security

import app.ssnc.io.oasis.repository.EmployeeRepository
import mu.KLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class CustomUserDetails : UserDetailsService {
    companion object : KLogging()

    @Autowired
    private lateinit var employeeRepository: EmployeeRepository

    //    @Transactional
    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(email: String): UserDetails {

        logger.info{ "loadUserByUsername username: " + email }
        employeeRepository.findEmployeesByEmail(email)?.let { profile ->
            logger.info{ "loadUserByUsername find email: " + profile.email }
//            val authorities = profile.role.map {role -> SimpleGrantedAuthority(role.name.name)}.toList()
//            return UserPrincipal(
//                profile, authorities = authorities )
            return UserPrincipal.create(profile)
        }

        logger.info{ "loadUserByUsername find not email: " + email }
        throw UsernameNotFoundException("User '$email' not found")
    }

    @Transactional
    fun loadUserById(id: Long): UserDetails {
        val user = employeeRepository.findById(id).orElseThrow{ UsernameNotFoundException("User with id $id not found.") }
        return UserPrincipal.create(user)
    }
}