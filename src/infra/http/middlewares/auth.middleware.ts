import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'
import { z } from 'zod'

import { decodeToken } from '@lib/jwt'
import { NotAuthorized } from 'src/app/errors/not-authorized'

type Token = {
  id: string,
  email: string
  role: string
  iat: number
  exp: number
  sub: string
}

const verifyToken = (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
  const authHeader = request.headers.authorization

  if (!authHeader) throw new NotAuthorized('Token not provided')

  const token = authHeader.split(' ')[1]

  const { id, email, role } = decodeToken(token) as Token

  request.user = { id, email, role }

  return done()
}

const isAdmin = (request: FastifyRequest, response: FastifyReply, done: HookHandlerDoneFunction) => {
  verifyToken(request, response, () => {
    if (request.user.role === 'admin') {
      return done()
    }else{
      throw new NotAuthorized('Restricted')
    }
  })
}

const checkUserOrIsAdmin = (request: FastifyRequest, response: FastifyReply, done: HookHandlerDoneFunction) => {
  const paramsSchema = z.object({
    id: z.string().uuid({ message: 'Incorrect ID format' })
  })

  const { id: userId } = paramsSchema.parse(request.params)

  verifyToken(request, response, () => {
      if(request.user.id == userId || request.user.role === 'admin'){
        return done()
      }else{
        throw new NotAuthorized('Restricted')
      }
  })
}

export {
  verifyToken,
  isAdmin,
  checkUserOrIsAdmin
}
