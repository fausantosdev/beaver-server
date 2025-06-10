import { DeleteTasks } from '@app/interfaces/use-cases/task/delete-tasks'
import { ITaskRepository } from '@domain/repositories/i-task-repository'
import { DeleteTaskDto } from '@shared/dtos/task-dtos'
import { ResourceNotFound } from '@shared/errors/resource-not-found'
import { isCustomErrorHelper } from '@shared/utils/is-cuscom-error-helper'
import { Response, response } from '@shared/utils/response-helper'

class DeleteTasksUseCase implements DeleteTasks {
  constructor(
    private taskRepository: ITaskRepository
  ) {}

  public execute = async ({ user_id, tasksIds }: DeleteTaskDto) => {
    try {
      let where

      if (tasksIds && tasksIds.length > 0) {
        where = {
          user_id,
          id: {
            in: tasksIds
          }
        }
      } else {
        where = { user_id }
      }

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
