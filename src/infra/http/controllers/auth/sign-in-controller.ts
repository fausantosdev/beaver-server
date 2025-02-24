import { SignIn } from '@protocols/use-cases/auth/sign-in'
import { FastifyReply,FastifyRequest } from 'fastify'
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

    const { jwt } = await this.signInUseCase.execute({ email, password })

    return reply.send({
      status: true,
      data: jwt,
      message: null
    })
  }
}

export { SignInController }
