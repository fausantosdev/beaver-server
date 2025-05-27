import { ResetPassword } from '@app/interfaces/use-cases/auth/reset-password'
import { FastifyReply,FastifyRequest } from 'fastify'
import { z } from 'zod'

class ResetPasswordController {
  constructor(
    private resetPasswordUseCase: ResetPassword
  ) {}

  public handle = async (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> => {
    const schema = z.object({
      token: z.string().min(35, { message: 'You need to send the token' }),
      email: z.string().email({ message: 'Invalid email address' }),
      newPassword: z.string().min(8, { message: 'Your password must be at least 8 characters long' })
    })

    const { token, email, newPassword } = schema.parse(request.body)

    const { status, data, message } = await this.resetPasswordUseCase.execute({ token, email, newPassword })

    return reply.send({
      status,
      data,
      message
    })
  }
}

export { ResetPasswordController }
