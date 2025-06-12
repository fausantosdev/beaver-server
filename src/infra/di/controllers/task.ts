import { createTaskUseCases } from '@infra/di/use-cases/task'
import { TaskController } from '@infra/http/controllers/task-controller'

export function createTaskControllers() {
  const taskUseCases = createTaskUseCases()
  const taskController = new TaskController(
    taskUseCases.create,
    taskUseCases.get,
    taskUseCases.edit,
    taskUseCases.delete
  )

  return {
    create: taskController.create,
    read: taskController.read,
    update: taskController.update,
    delete: taskController.delete
  }
}
