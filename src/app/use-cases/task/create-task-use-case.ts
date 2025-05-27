import { CreateTaskDto } from '@app/dtos/task-dtos'
import { CreateTask } from '@app/interfaces/use-cases/task/create-task'
import { Repository } from '@domain/interfaces/repository'
import { Task } from '@entities/task'
import { response } from '@shared/utils/response-helper'

class CreateTaskUseCase implements CreateTask {
  constructor(
    private taskRepository: Repository,
    private userRepository: Repository
  ) {}

  public execute = async ({ user_id, description, parent_id = null }: CreateTaskDto) => {
    try {
      if (!(await this.userRepository.findOne({ id: user_id }))) throw Error('User not found')

      if (
        parent_id &&
        (await this.taskRepository.read({ user_id, id: parent_id })).length === 0
      ) throw Error('Parent task not found')

      const newTask = await this.taskRepository.create({
        user_id,
        description,
        parent_id
      }) as Task

      return response({ data: newTask })
    } catch (error) {
      return response({
        status: false,
        message: 'Internal server error'
      })
    }
  }
}

export { CreateTaskUseCase }
