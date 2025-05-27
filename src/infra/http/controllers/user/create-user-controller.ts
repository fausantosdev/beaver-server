import { CreateUser } from '@app/interfaces/use-cases/user/create-user'
import { FastifyReply,FastifyRequest } from 'fastify'
import { z } from 'zod'

class CreateUserController {
  constructor(
    private createUserUseCase: CreateUser
  ) {
    this.handle = this.handle.bind(this)
  }

  async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const schema = z.object({
      name: z.string().min(2, { message: 'Must be 2 or more characters long' }),
      email: z.string().email({ message: 'Invalid email address' }),
      password: z.string().min(8, { message: 'Your password must be at least 8 characters long' })
    })

    const { name, email, password } = schema.parse(request.body)

    const { status, data, message } = await this.createUserUseCase.execute({
      name,
      email,
      password_hash: password
    })

    return reply.send({
      status,
      data,
      message
    })
  }
}

export { CreateUserController }
