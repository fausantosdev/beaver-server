import { FastifyReply, FastifyRequest } from 'fastify'

import { UserRepository } from '../repositories/user.repository'

class UserController {
  public static async store (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    
    const { name, email, password } = request.body

    const user = await UserRepository.create({ name, email, password })

    return reply.send({
      status: true,
      data: user,
      message: null
    })
  }
}

export { UserController }