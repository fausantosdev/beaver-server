import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { DeleteTasks } from '@protocols/use-cases/task/delete-tasks'


class DeleteTasksController {
  constructor(
    private deleteTasksUseCase: DeleteTasks
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const schema = z.object({
      tasks_ids: z.array(z.string().uuid()).min(1, 'You have not selected any tasks')
    })

    try {
      const { tasks_ids } = schema.parse(request.body)

      const result = await this.deleteTasksUseCase.execute({
        id: {
          in: tasks_ids
        },
        user_id: request.user.id
      })
      return reply.send({
        status: true,
        data: result,
        message: null
      })
    } catch (error: any) {
      return reply.send({
        status: false,
        data: null,
        message: error.message
      })
    }
  }
}

export { DeleteTasksController }
