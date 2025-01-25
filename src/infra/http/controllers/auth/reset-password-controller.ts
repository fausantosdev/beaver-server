import { FastifyRequest, FastifyReply } from 'fastify'

import { ResetPassword } from '@protocols/use-cases/auth/reset-password'

class ResetPasswordController {
  constructor(
    private resetPasswordUseCase: ResetPassword
  ) {}

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { token, email, newPassword } = request.body

    try {
      const result = await this.resetPasswordUseCase.execute({ token, email, newPassword })

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

export { ResetPasswordController }
