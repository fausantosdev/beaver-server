import { hash } from '@lib/bcrypt'

import { CreateTask } from '@protocols/use-cases/task/create-task'
import { Repository } from '@protocols/repository'

import { CreateTaskDto, TaskDto } from '@dtos/task-dtos'

class CreateTaskUseCase implements CreateTask {
  constructor(
    private taskRepository: Repository
  ) {
    this.taskRepository = taskRepository
  }
  async execute({ user_id, description, parent_id = null }: CreateTaskDto) {
    if (
      parent_id &&
      (await this.taskRepository.read({ user_id, parent_id })).length === 0
    ) throw Error('Parent task not found')

    const newTask = await this.taskRepository.create({
      user_id,
      description,
      parent_id
    }) as TaskDto

    return newTask
  }
}

export { CreateTaskUseCase }
