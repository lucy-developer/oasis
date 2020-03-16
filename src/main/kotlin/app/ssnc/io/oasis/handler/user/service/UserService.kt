package app.ssnc.io.oasis.handler.user.service

import app.ssnc.io.oasis.entity.model.User
import app.ssnc.io.oasis.repository.EmployeeRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class UserService {
    @Autowired
    private lateinit var employeeRepository: EmployeeRepository

    fun findByEmail(email: String) : User? {
        return employeeRepository.findEmployeesByEmail(email)
    }

}