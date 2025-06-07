import { createTaskUseCases } from '@infra/di/use-cases/task'
import { CreateTaskController } from '@infra/http/controllers/task/create-task-controller'
import { DeleteTasksController } from '@infra/http/controllers/task/delete-tasks-controller'
import { EditTaskController } from '@infra/http/controllers/task/edit-task-controller'
import { GetTasksController } from '@infra/http/controllers/task/get-tasks-controller'

export function createTaskControllers() {
  const taskUseCases = createTaskUseCases()

  return {
    create: new CreateTaskController(taskUseCases.create),
    get: new GetTasksController(taskUseCases.get),
    edit: new EditTaskController(taskUseCases.edit),
    delete: new DeleteTasksController(taskUseCases.delete)
  }
}
