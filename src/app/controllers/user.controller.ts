import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserRepository } from '../repositories/user.repository'

class UserController {
  public static async store (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const schema = z.object({
      name: z.string().min(2, { message: 'Must be 2 or more characters long' }),
      email: z.string().email({ message: 'Invalid email address' }),
      password: z.string().min(8, { message: 'Your password must be at least 8 characters long' })
    })

    try {
      const { name, email, password } = schema.parse(request.body)

      const user = await UserRepository.create({ name, email, password })
  
      return reply.send({
        status: true,
        data: user,
        message: null
      })
    } catch (error: any) {
      return reply.send({
        status: false,
        data: null,
        message: error
      })
    }
  }
}

export { UserController }