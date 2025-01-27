import { Repository } from '@protocols/repository'

import { DeleteTasks } from '@protocols/use-cases/task/delete-tasks'

class DeleteTasksUseCase implements DeleteTasks {
  constructor(
    private taskRepository: Repository
  ) {}

  async execute(where: object): Promise<{ count: number } | null> {
    const tasks = await this.taskRepository.read(where)

    if (tasks.length === 0) throw new Error('No tasks found')

    const { count } = await this.taskRepository.delete(where) as { count: number }

    return { count }
  }
}

export { DeleteTasksUseCase }
