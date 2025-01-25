import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { GetUsers } from '@protocols/use-cases/user/get-users'

class GetUsersController {
  constructor(
    private getUsersUseCase: GetUsers
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {

    try {
      const { id } = request.params

      const result = id ?
        await this.getUsersUseCase.execute({ id }) :
        await this.getUsersUseCase.execute()

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

export { GetUsersController }
