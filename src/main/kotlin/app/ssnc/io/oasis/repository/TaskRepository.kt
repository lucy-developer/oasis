package app.ssnc.io.oasis.repository

import app.ssnc.io.oasis.entity.model.Project
import app.ssnc.io.oasis.entity.model.Task
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface TaskRepository : CrudRepository<Task, Long> {
}

@Repository
interface ProjectRepository: CrudRepository<Project, Long> {
    fun findByNameOrKey(name: String, key: String): Optional<Project>
}