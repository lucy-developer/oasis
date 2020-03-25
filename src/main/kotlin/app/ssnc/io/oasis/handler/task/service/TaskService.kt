package app.ssnc.io.oasis.handler.task.service

import app.ssnc.io.oasis.entity.model.Project
import app.ssnc.io.oasis.entity.model.Task
import app.ssnc.io.oasis.entity.model.TaskAssign
import app.ssnc.io.oasis.entity.model.User
import app.ssnc.io.oasis.entity.request.CreateProjectRequest
import app.ssnc.io.oasis.entity.request.FirewallRequest
import app.ssnc.io.oasis.exception.ResourceNotFoundException
import app.ssnc.io.oasis.exception.UniquenessFieldException
import app.ssnc.io.oasis.handler.user.service.UserService
import app.ssnc.io.oasis.repository.ProjectRepository
import app.ssnc.io.oasis.repository.TaskAssignRepository
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
    private lateinit var taskAssignRepository: TaskAssignRepository

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

    fun findProjectByName(name: String): Project? {
        return projectRepository.findByKey(name).orElseThrow { throw ResourceNotFoundException("Project not found")  }
    }

    fun generationKey(seq: Long) : String {
        val project = projectRepository.findById(seq).get()

        taskRepository.findFirstByProjectIdOrderByIdDesc(seq)?.let { exist ->
            return String.format("%s-%05d", project.key , exist.key.split('-')[1].toLong()+1)
        } ?: run {
          return   String.format("%s-%05d", project.key , 1)
        }
    }

    //@Throws
    fun createTask(task: Task) {
        taskRepository.save(task)
    }

    fun createTaskAssigns(taskAssign: TaskAssign) {
        taskAssignRepository.save(taskAssign)
    }

    fun searchTaskByCreateUser(user: User): List<Task>? {
        return taskRepository.findByCreator(creator = user)
    }

    fun searchTaskByProject(user: User, projectId: Long): List<Task>? {
        return taskRepository.findByProjectIdAndCreatorOrAssignee(creator = user, assignee = user, projectId = projectId)
    }

    fun searchTaskById(id: Long): Task? {
        return taskRepository.findById(id).orElse(null)
    }


}