import { createTaskUseCases } from '@infra/di/use-cases/task'

import { CreateTaskController } from './create-task-controller'
import { DeleteTasksController } from './delete-tasks-controller'
import { EditTaskController } from './edit-task-controller'
import { GetTasksController } from './get-tasks-controller'

export function createTaskControllers() {
  const taskUseCases = createTaskUseCases()

  return {
    create: new CreateTaskController(taskUseCases.create),
    get: new GetTasksController(taskUseCases.get),
    edit: new EditTaskController(taskUseCases.edit),
    delete: new DeleteTasksController(taskUseCases.delete)
  }
}
