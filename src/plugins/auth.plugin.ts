import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify'
import { decodeToken } from 'src/lib/jwt'

type Token = {
  id: string,
  username: string
  iat: number
  exp: number
  sub: string
}

const verifyToken = (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
  const authHeader = request.headers.authorization

  if (!authHeader) throw new Error('Token not provided')

  const token = authHeader.split(' ')[1]
  
  const { id, username } = decodeToken(token) as Token

  request.user = { id, username }

  return done()
}

export {
  verifyToken
}