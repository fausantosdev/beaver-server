import { CreateTask } from '@app/interfaces/use-cases/task/create-task'
import { DeleteTasks } from '@app/interfaces/use-cases/task/delete-tasks'
import { EditTask } from '@app/interfaces/use-cases/task/edit-task'
import { GetTasks } from '@app/interfaces/use-cases/task/get-tasks'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

class TaskController {
  constructor(
    private createTaskUseCase: CreateTask,
    private getTasksUseCase: GetTasks,
    private editTaskUseCase: EditTask,
    private deleteTasksUseCase: DeleteTasks
  ) {}

  public create = async (request: FastifyRequest, response: FastifyReply): Promise<void> => {
    const schema = z.object({
      parent_id: z.string().uuid().optional(),
      description: z.string().min(2, { message: 'The text must have at least two characters' })
    })

    const { description, parent_id } = schema.parse(request.body)

    const { user } = request

    const { status, data, message } = await this.createTaskUseCase.execute({
      user_id: user.id, description, parent_id
    })

    response.send({
      status,
      data,
      message
    })

    return
  }

  public read = async (request: FastifyRequest, response: FastifyReply): Promise<void> => {
    const schema = z.object({
      id: z.string().uuid().optional()
    })

    const { id } = schema.parse(request.params)
    const { user } = request

    let query

    if(id) {
      query = { id, user_id: user.id, parent_id: null }
    }else {
      query = { user_id: user.id, parent_id: null }
    }

    const { status, data, message } = await this.getTasksUseCase.execute(query)

    response.send({
      status,
      data,
      message
    })

    return
  }

  public update = async (request: FastifyRequest, response: FastifyReply): Promise<void> => {
    const schemaId = z.object({
      id: z.string().uuid({ message: 'Incorrect ID format' })
    })

    const schema = z.object({
      description: z.string().min(2, { message: 'The text must have at least two characters' })
    })

    const { id } = schemaId.parse(request.params)
    const dataBody = schema.parse(request.body)

    const { status, data, message } = await this.editTaskUseCase.execute({
      where: {
        user_id: request.user.id,
        id: id
      },
      query: dataBody
    })

    response.send({
      status,
      data,
      message
    })

    return
  }

  public delete = async (request: FastifyRequest, response: FastifyReply): Promise<void> => {
    const schema = z.object({
      tasks_ids: z.array(z.string().uuid()).min(1, 'You have not selected any tasks')
    })

    const { tasks_ids } = schema.parse(request.body)

    const { status, data, message } = await this.deleteTasksUseCase.execute({
      user_id: request.user.id,
      tasksIds: tasks_ids
    })

    response.send({
      status,
      data,
      message
    })

    return
  }
}

export { TaskController }
