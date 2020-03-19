package app.ssnc.io.oasis.handler.user.service

import app.ssnc.io.oasis.entity.model.User
import app.ssnc.io.oasis.entity.request.SearchUserRequest
import app.ssnc.io.oasis.exception.ResourceNotFoundException
import app.ssnc.io.oasis.repository.EmployeeRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserService {
    @Autowired
    private lateinit var employeeRepository: EmployeeRepository

    fun findByEmail(email: String) : User? {
        return employeeRepository.findEmployeesByEmail(email).get()
            //.orElseThrow {  throw ResourceNotFoundException("User not found") }
    }

    @Throws(ResourceNotFoundException::class)
    fun searchAll(): MutableIterable<User> {
        return employeeRepository.findAll()
    }

    @Throws(ResourceNotFoundException::class)
    fun search(request: SearchUserRequest): User? {
        when (request.key) {
            "NAME" -> return findByName(request.id)
            "ID" -> return findByEmail(request.id)
            else -> throw ResourceNotFoundException("User not found")

        }
    }

    fun findByName(id: String) : User? {
        return employeeRepository.findByUsername(id).get()
            //.orElseThrow {  throw ResourceNotFoundException("User not found") }
    }

    fun findById(id: Long): Optional<User> {
        return employeeRepository.findById(id)
    }

}