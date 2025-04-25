import { CreateTaskDto, TaskDto } from '@interfaces/dtos/task-dtos'
import { Repository } from '@interfaces/repository'
import { CreateTask } from '@interfaces/use-cases/task/create-task'
import { response } from '@shared/utils/response-helper'

class CreateTaskUseCase implements CreateTask {
  constructor(
    private taskRepository: Repository,
    private userRepository: Repository
  ) {
    this.execute = this.execute.bind(this)
  }

  async execute({ user_id, description, parent_id = null }: CreateTaskDto) {
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
      }) as TaskDto

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
