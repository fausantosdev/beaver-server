import { ForgotPassword } from '@protocols/use-cases/auth/forgot-password'
import { FastifyReply,FastifyRequest } from 'fastify'
import { z } from 'zod'


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

    const { email } = schema.parse(request.body)

    const result = await this.forgotPasswordUseCase.execute(email)

    return reply.send({
      status: true,
      data: result,
      message: null
    })
  }
}

export { ForgotPasswordController }
