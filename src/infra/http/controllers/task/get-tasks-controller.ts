import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { GetTasks } from '@protocols/use-cases/task/get-tasks'


class GetTasksController {
  constructor(
    private getTasksUseCase: GetTasks
  ) {
    this.handle = this.handle.bind(this)
  }

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {

    try {
      const { id } = request.params
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
    } catch (error: any) {
      return reply.send({
        status: false,
        data: null,
        message: error.message
      })
    }
  }
}

export { GetTasksController }
