import { Task } from '@domain/entities/task'
import { ITaskRepository } from '@domain/repositories/i-task-repository'
import { isCustomErrorHelper } from '@shared/utils/is-cuscom-error-helper'
import { response } from '@shared/utils/response-helper'

class GetTasksUseCase {
  constructor(
    private taskRepository: ITaskRepository
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
