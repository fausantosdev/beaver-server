import { GetUsers } from '@app/interfaces/use-cases/user/get-users'
import { FastifyReply,FastifyRequest } from 'fastify'
import { z } from 'zod'

class GetUsersController {
  constructor(
    private getUsersUseCase: GetUsers
  ) {}

  public handle = async (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> => {
    const schema = z.object({
      id: z.string().uuid({ message: 'Id is required' })
    })

    const { id } = schema.parse(request.params)

    const { status, data, message } = id ?
      await this.getUsersUseCase.execute({ id }) :
      await this.getUsersUseCase.execute()

    return reply.send({
      status,
      data,
      message
    })
  }
}

export { GetUsersController }
