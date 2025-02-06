import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { GetUsers } from '@protocols/use-cases/user/get-users'

class GetUsersController {
  constructor(
    private getUsersUseCase: GetUsers
  ) {
    this.handle = this.handle.bind(this)
  }

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const schema = z.object({
      id: z.string().uuid({ message: 'Id is required' })
    })

    const { id } = schema.parse(request.params)

    const result = id ?
      await this.getUsersUseCase.execute({ id }) :
      await this.getUsersUseCase.execute()

    return reply.send({
      status: true,
      data: result,
      message: null
    })
  }
}

export { GetUsersController }
