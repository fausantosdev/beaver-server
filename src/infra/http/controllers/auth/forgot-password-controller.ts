import { FastifyRequest, FastifyReply } from 'fastify'

import { ForgotPassword } from '@protocols/use-cases/auth/forgot-password'

class ForgotPasswordController {
  constructor(
    private forgotPasswordUseCase: ForgotPassword
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { email } = request.body

    try {
      const result = await this.forgotPasswordUseCase.execute(email)

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

export { ForgotPasswordController }
