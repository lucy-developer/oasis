package app.ssnc.io.oasis.handler.task.service

import app.ssnc.io.oasis.entity.model.Project
import app.ssnc.io.oasis.entity.request.CreateProjectRequest
import app.ssnc.io.oasis.exception.UniquenessFieldException
import app.ssnc.io.oasis.handler.user.service.UserService
import app.ssnc.io.oasis.repository.ProjectRepository
import app.ssnc.io.oasis.repository.TaskRepository
import mu.KLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class TaskService {
    companion object : KLogging()

    @Autowired
    private lateinit var projectRepository: ProjectRepository

    @Autowired
    private lateinit var taskRepository: TaskRepository

    @Autowired
    private lateinit var userService: UserService

    fun checkIfProjectIsAleadyUsed(project: Project): Project =
        when {
            projectRepository.findByNameOrKey(
                project.name, project.key
            ).isPresent -> throw UniquenessFieldException("project is already")
            else -> project
        }

    @Throws(UniquenessFieldException::class)
    fun createProject(request: CreateProjectRequest) {
        val project = Project(
            key = request.key, name = request.name, description = request.description,
            owner = userService.findById(request.owner).get())

        checkIfProjectIsAleadyUsed(project).let { newProject ->
            projectRepository.save(newProject).apply {
            }
        }
    }


}