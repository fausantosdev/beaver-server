import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { ResetPassword } from '@protocols/use-cases/auth/reset-password'

class ResetPasswordController {
  constructor(
    private resetPasswordUseCase: ResetPassword
  ) {
    this.handle = this.handle.bind(this)
  }

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const schema = z.object({
      token: z.string().jwt({ message: 'Invalid JWT' }),
      email: z.string().email({ message: 'Invalid email address' }),
      newPassword: z.string().min(8, { message: 'Your password must be at least 8 characters long' })
    })

    try {
      const { token, email, newPassword } = schema.parse(request.body)

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
