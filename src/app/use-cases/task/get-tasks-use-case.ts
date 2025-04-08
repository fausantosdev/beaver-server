import { TaskDto } from '@dtos/task-dtos'
import { Repository } from '@protocols/repository'
import { GetTasks } from '@protocols/use-cases/task/get-tasks'
import { response } from '@utils/response-helper'

class GetTasksUseCase implements GetTasks {
  constructor(
    private taskRepository: Repository
  ) {
    this.execute = this.execute.bind(this)
  }

  async execute(where?: object) {
    let result

    try {
      if (
        where &&
        (
          ('id' in where)
        )
      )
      {
        result = await this.taskRepository.findOne(where) as TaskDto
      } else {
        result = await this.taskRepository.read(where!) as TaskDto[]
      }

      return response({ data: result })
    } catch (error) {
      return response({
        status: false,
        message: 'Internal server error'
      })
    }
  }
}

export { GetTasksUseCase }
