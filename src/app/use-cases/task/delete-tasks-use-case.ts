import { Repository } from '@protocols/repository'
import { DeleteTasks } from '@protocols/use-cases/task/delete-tasks'
import { response } from '@utils/response-helper'

class DeleteTasksUseCase implements DeleteTasks {
  constructor(
    private taskRepository: Repository
  ) {
    this.execute = this.execute.bind(this)
  }

  async execute(where: object) {
    const tasks = await this.taskRepository.read(where)

    if (tasks.length === 0) throw new Error('No tasks found')

    const { count } = await this.taskRepository.delete(where) as { count: number }

    return response({ data: count })
  }
}

export { DeleteTasksUseCase }
