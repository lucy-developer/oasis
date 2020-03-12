package app.ssnc.io.oasis.repository

import app.ssnc.io.oasis.model.User
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.domain.Specification
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface EmployeeRepository : CrudRepository<User, Long> {
    fun findEmployeesByEmail(email: String) : User?
    fun findEmployeesByEmailIn(emails: ArrayList<String>): ArrayList<User>
    fun findAll(specification: Specification<User>, pageable: Pageable): Page<User>
}