import { TaskDto } from '@dtos/task-dtos'
import { Repository } from '@protocols/repository'
import { GetTasks } from '@protocols/use-cases/task/get-tasks'
import { response } from 'src/utils/response-helper'

class GetTasksUseCase implements GetTasks {
  constructor(
    private taskRepository: Repository
  ) {
    this.execute = this.execute.bind(this)
  }

  async execute(where?: object) {
    let result

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
  }
}

export { GetTasksUseCase }
