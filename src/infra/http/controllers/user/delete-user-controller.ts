import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { DeleteUser } from '@protocols/use-cases/user/delete-user'

class DeleteUserController {
  constructor(
    private deleteUserUseCase: DeleteUser
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const schema = z.object({
      id: z.string().uuid({ message: 'Incorrect ID format' })
    })

    try {
      const { id } = schema.parse(request.params)

      const result = await this.deleteUserUseCase.execute(id)

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

export { DeleteUserController }
