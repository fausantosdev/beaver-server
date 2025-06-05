import { CreateTask } from '@app/interfaces/use-cases/task/create-task'
import { Task } from '@domain/entities/task'
import { ITaskRepository } from '@domain/repositories/i-task-repository'
import { IUserRepository } from '@domain/repositories/i-user-repository'
import { CreateTaskDto } from '@shared/dtos/task-dtos'
import { isCustomErrorHelper } from '@shared/utils/is-cuscom-error-helper'
import { response } from '@shared/utils/response-helper'

class CreateTaskUseCase implements CreateTask {
  constructor(
    private taskRepository: ITaskRepository,
    private userRepository: IUserRepository
  ) {}

  public execute = async ({ user_id, description, parent_id = null }: CreateTaskDto) => {
    try {
      if (!(await this.userRepository.findOne({ id: user_id }))) throw Error('User not found')

      if (
        parent_id &&
        (await this.taskRepository.read({ user_id, id: parent_id })).length === 0
      ) throw Error('Parent task not found')

      const task = new Task({
        user_id,
        description,
        parent_id
      })

      const newTask = await this.taskRepository.create(task)

      return response({ data: newTask })
    } catch (error) {
      return response({
        status: false,
        message: isCustomErrorHelper(error) ? error.message : 'Internal server error'
      })
    }
  }
}

export { CreateTaskUseCase }
