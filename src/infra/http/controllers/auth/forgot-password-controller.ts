import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { ForgotPassword } from '@protocols/use-cases/auth/forgot-password'


class ForgotPasswordController {
  constructor(
    private forgotPasswordUseCase: ForgotPassword
  ) {
    this.handle = this.handle.bind(this)
  }

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const schema = z.object({
      email: z.string().email({ message: 'Invalid email address' })
    })

    try {
      const { email } = schema.parse(request.body)

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
