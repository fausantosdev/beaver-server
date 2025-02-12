import { TaskRepository } from '@data/prisma/repositories/task-repository'
import { UserRepository } from '@data/prisma/repositories/user-repository'

import { CreateTaskUseCase } from './create-task-use-case'
import { DeleteTasksUseCase } from './delete-tasks-use-case'
import { EditTaskUseCase } from './edit-task-use-case'
import { GetTasksUseCase } from './get-tasks-use-case'

export function createTaskUseCases() {
  const taskRepository = new TaskRepository()
  const userRepository = new UserRepository()
  return {
    create: new CreateTaskUseCase(taskRepository, userRepository),
    get: new GetTasksUseCase(taskRepository),
    edit: new EditTaskUseCase(taskRepository),
    delete: new DeleteTasksUseCase(taskRepository),
  }
}
