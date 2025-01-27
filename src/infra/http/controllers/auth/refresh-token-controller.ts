import { FastifyRequest, FastifyReply } from 'fastify'

import { RefreshToken } from '@protocols/use-cases/auth/refresh-token'

class RefreshTokenController {
  constructor(
    private refreshTokenUseCase: RefreshToken
  ) {
    this.handle = this.handle.bind(this)
  }

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const token = request.headers?.authorization!.split(' ')[1]

    try {
      const { jwt } = await this.refreshTokenUseCase.execute(token)

      return reply.send({
        status: true,
        data: jwt,
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

export { RefreshTokenController }
