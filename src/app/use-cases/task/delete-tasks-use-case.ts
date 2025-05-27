import { DeleteTasks } from '@app/interfaces/use-cases/task/delete-tasks'
import { Repository } from '@domain/interfaces/repository'
import { response } from '@shared/utils/response-helper'

class DeleteTasksUseCase implements DeleteTasks {
  constructor(
    private taskRepository: Repository
  ) {}

  public execute = async (where: object) => {
    try {
      const tasks = await this.taskRepository.read(where)

      if (tasks.length === 0) throw new Error('No tasks found')

      const { count } = await this.taskRepository.delete(where) as { count: number }

      return response({ data: count })
    } catch (error) {
      return response({
        status: false,
        message: 'Internal server error'
      })
    }
  }
}

export { DeleteTasksUseCase }
