import { DeleteUser } from '@protocols/use-cases/user/delete-user'
import { FastifyReply,FastifyRequest } from 'fastify'
import { z } from 'zod'

class DeleteUserController {
  constructor(
    private deleteUserUseCase: DeleteUser
  ) {
    this.handle = this.handle.bind(this)
  }

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const schema = z.object({
      id: z.string().uuid({ message: 'Incorrect ID format' })
    })

    const { id } = schema.parse(request.params)

    const result = await this.deleteUserUseCase.execute(id)

    return reply.send({
      status: true,
      data: result,
      message: null
    })
  }
}

export { DeleteUserController }
