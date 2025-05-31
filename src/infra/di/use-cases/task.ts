import { CreateTaskUseCase } from '@app/use-cases/task/create-task-use-case'
import { DeleteTasksUseCase } from '@app/use-cases/task/delete-tasks-use-case'
import { EditTaskUseCase } from '@app/use-cases/task/edit-task-use-case'
import { GetTasksUseCase } from '@app/use-cases/task/get-tasks-use-case'
import { TaskRepository } from '@data/repositories/task-repository'
import { UserRepository } from '@data/repositories/user-repository'

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
