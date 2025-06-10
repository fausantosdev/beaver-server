import { EditTask } from '@app/interfaces/use-cases/task/edit-task'
import { Task } from '@domain/entities/task'
import { ITaskRepository } from '@domain/repositories/i-task-repository'
import { EditTaskDto } from '@shared/dtos/task-dtos'
import { ResourceNotFound } from '@shared/errors/resource-not-found'
import { isCustomErrorHelper } from '@shared/utils/is-cuscom-error-helper'
import { response } from '@shared/utils/response-helper'

class EditTaskUseCase implements EditTask {
  constructor(
    private taskRepository: ITaskRepository
  ) {}

  public execute = async ({ query, where }: EditTaskDto) =>{
    try {
      const taskExists = await this.taskRepository.findOne(where)

      if (!taskExists) throw new ResourceNotFound('Task not found')

      const newTask = await this.taskRepository.update(
        where,
        query
      )

      return response({ data: newTask })
    } catch (error) {
      return response({
        status: false,
        message: isCustomErrorHelper(error) ? error.message : 'Internal server error'
      })
    }
  }
}

export { EditTaskUseCase }
