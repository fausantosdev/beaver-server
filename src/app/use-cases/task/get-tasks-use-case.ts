import { GetTasks } from '@app/interfaces/use-cases/task/get-tasks'
import { Repository } from '@domain/interfaces/repository'
import { Task } from '@entities/task'
import { response } from '@shared/utils/response-helper'

class GetTasksUseCase implements GetTasks {
  constructor(
    private taskRepository: Repository
  ) {}

  public execute = async (where?: object) =>{
    let result

    try {
      if (
        where &&
        (
          ('id' in where)
        )
      )
      {
        result = await this.taskRepository.findOne(where) as Task
      } else {
        result = await this.taskRepository.read(where!) as Task[]
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
