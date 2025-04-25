import { SignIn } from '@interfaces/use-cases/auth/sign-in'
import { FastifyReply,FastifyRequest } from 'fastify'
import { response } from 'src/shared/utils/response-helper'
import { z } from 'zod'

class SignInController {
  constructor(
    private signInUseCase: SignIn
  ) {
    this.handle = this.handle.bind(this)
  }

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const schema = z.object({
      email: z.string().email({ message: 'Invalid email address' }),
      password: z.string().min(8, { message: 'Your password must be at least 8 characters long' })
    })

    const { email, password } = schema.parse(request.body)

    const { status, data, message } = await this.signInUseCase.execute({ email, password })

    return reply.send({
      status,
      data,
      message
    })
  }
}

export { SignInController }
