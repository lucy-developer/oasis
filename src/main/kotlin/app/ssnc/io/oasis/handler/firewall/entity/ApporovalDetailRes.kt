package app.ssnc.io.oasis.handler.firewall.entity

import app.ssnc.io.oasis.entity.model.Task
import app.ssnc.io.oasis.entity.model.TaskAssign

data class ApporovalDetailRes (
    val task: Task,
    val assignees: List<TaskAssign>
)
