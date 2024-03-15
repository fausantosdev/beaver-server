import { FastifyReply, FastifyRequest } from 'fastify'

class UserController {
  public static async list (request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    return reply.send({ test: 'test' })
  }
}

export { UserController }