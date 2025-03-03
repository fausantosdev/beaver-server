import { RefreshToken } from '@protocols/use-cases/auth/refresh-token'
import { FastifyReply,FastifyRequest } from 'fastify'

class RefreshTokenController {
  constructor(
    private refreshTokenUseCase: RefreshToken
  ) {
    this.handle = this.handle.bind(this)
  }

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
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
