import { GetTasks } from '@app/interfaces/use-cases/task/get-tasks'
import { Task } from '@domain/entities/task'
import { TaskRepository } from '@domain/repositories/task-repository'
import { isCustomErrorHelper } from '@shared/utils/is-cuscom-error-helper'
import { response } from '@shared/utils/response-helper'

class GetTasksUseCase implements GetTasks {
  constructor(
    private taskRepository: TaskRepository
  ) {}

  public execute = async (where?: object) => {
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
        message: isCustomErrorHelper(error) ? error.message : 'Internal server error'
      })
    }
  }
}

export { GetTasksUseCase }
