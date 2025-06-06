import { ForgotPassword } from '@app/interfaces/use-cases/auth/forgot-password'
import { FastifyReply,FastifyRequest } from 'fastify'
import { z } from 'zod'


class ForgotPasswordController {
  constructor(
    private forgotPasswordUseCase: ForgotPassword
  ) {}

  public handle = async (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> => {
    const schema = z.object({
      email: z.string().email({ message: 'Invalid email address' })
    })

    const { email } = schema.parse(request.body)

    const { status, data, message } = await this.forgotPasswordUseCase.execute(email)

    return reply.send({
      status,
      data: data,
      message
    })
  }
}

export { ForgotPasswordController }
