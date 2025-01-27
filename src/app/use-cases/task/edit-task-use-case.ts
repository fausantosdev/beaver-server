import { hash } from '@lib/bcrypt'

import { EditTask } from '@protocols/use-cases/task/edit-task'
import { Repository } from '@protocols/repository'

import { EditTaskDto, TaskDto } from '@dtos/task-dtos'

class EditTaskUseCase implements EditTask{
  constructor(
    private taskRepository: Repository
  ) {
    this.execute = this.execute.bind(this)
  }

  async execute(id: string, data: EditTaskDto) {
    const taskExists = await this.taskRepository.findOne({ id })

    if (!taskExists) throw new Error('Task not found')

    const newTask = await this.taskRepository.update(
      { id },
      data
    ) as TaskDto

    return newTask
  }
}

export { EditTaskUseCase }
