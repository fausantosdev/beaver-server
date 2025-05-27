import { RefreshToken } from '@app/interfaces/use-cases/auth/refresh-token'
import { FastifyReply,FastifyRequest } from 'fastify'

class RefreshTokenController {
  constructor(
    private refreshTokenUseCase: RefreshToken
  ) {}

  public handle = async (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> => {
    const token = request.headers?.authorization!.split(' ')[1]

    const { status, data, message } = await this.refreshTokenUseCase.execute(token)

    return reply.send({
      status,
      data,
      message
    })
  }
}

export { RefreshTokenController }
