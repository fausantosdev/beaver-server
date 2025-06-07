import { ITaskRepository } from '@domain/repositories/i-task-repository'
import { ResourceNotFound } from '@shared/errors/resource-not-found'
import { isCustomErrorHelper } from '@shared/utils/is-cuscom-error-helper'
import { response } from '@shared/utils/response-helper'

class DeleteTasksUseCase {
  constructor(
    private taskRepository: ITaskRepository
  ) {}

  public execute = async (where: object) => {
    try {
      const tasks = await this.taskRepository.read(where)

      if (tasks.length === 0) throw new ResourceNotFound('No tasks found')

      const { count } = await this.taskRepository.delete(where) as { count: number }

      return response({ data: count })
    } catch (error) {
      return response({
        status: false,
        message: isCustomErrorHelper(error) ? error.message : 'Internal server error'
      })
    }
  }
}

export { DeleteTasksUseCase }
