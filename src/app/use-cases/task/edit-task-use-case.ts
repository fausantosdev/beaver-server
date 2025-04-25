import { EditTaskDto, TaskDto } from '@interfaces/dtos/task-dtos'
import { Repository } from '@interfaces/repository'
import { EditTask } from '@interfaces/use-cases/task/edit-task'
import { response } from '@shared/utils/response-helper'

class EditTaskUseCase implements EditTask{
  constructor(
    private taskRepository: Repository
  ) {
    this.execute = this.execute.bind(this)
  }

  async execute(id: string, data: EditTaskDto) {
    try {
      const taskExists = await this.taskRepository.findOne({ id })

      if (!taskExists) throw new Error('Task not found')

      const newTask = await this.taskRepository.update(
        { id },
        data
      ) as TaskDto

      return response({ data: newTask })
    } catch (error) {
      return response({
        status: false,
        message: 'Internal server error'
      })
    }
  }
}

export { EditTaskUseCase }
