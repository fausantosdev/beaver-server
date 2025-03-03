import { DeleteTasks } from '@protocols/use-cases/task/delete-tasks'
import { FastifyReply,FastifyRequest } from 'fastify'
import { z } from 'zod'


class DeleteTasksController {
  constructor(
    private deleteTasksUseCase: DeleteTasks
  ) {
    this.handle = this.handle.bind(this)
  }

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const schema = z.object({
      tasks_ids: z.array(z.string().uuid()).min(1, 'You have not selected any tasks')
    })

    const { tasks_ids } = schema.parse(request.body)

    const { status, data, message } = await this.deleteTasksUseCase.execute({
      id: {
        in: tasks_ids
      },
      user_id: request.user.id
    })
    return reply.send({
      status,
      data,
      message
    })
  }
}

export { DeleteTasksController }
