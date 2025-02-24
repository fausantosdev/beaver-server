import { GetTasks } from '@protocols/use-cases/task/get-tasks'
import { FastifyReply,FastifyRequest } from 'fastify'
import { z } from 'zod'


class GetTasksController {
  constructor(
    private getTasksUseCase: GetTasks
  ) {
    this.handle = this.handle.bind(this)
  }

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
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

    const result = await this.getTasksUseCase.execute(query)

    return reply.send({
      status: true,
      data: result,
      message: null
    })
  }
}

export { GetTasksController }
