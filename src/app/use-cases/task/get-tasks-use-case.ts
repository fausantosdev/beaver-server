import { TaskDto } from '@dtos/task-dtos'
import { Repository } from '@protocols/repository'
import { GetTasks } from '@protocols/use-cases/task/get-tasks'

class GetTasksUseCase implements GetTasks {
  constructor(
    private taskRepository: Repository
  ) {
    this.execute = this.execute.bind(this)
  }

  async execute(where?: object): Promise<TaskDto[] | TaskDto> {
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

    return result
  }
}

export { GetTasksUseCase }
