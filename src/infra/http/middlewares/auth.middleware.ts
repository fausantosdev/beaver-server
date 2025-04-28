import { JwtService } from '@lib/jwt-service'
import { NotAuthorized } from '@shared/errors/not-authorized'
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'
import { z } from 'zod'

type Token = {
  id: string,
  email: string
  role: string
  iat: number
  exp: number
  sub: string
}

const jwtService = new JwtService()

const verifyToken = (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
  const authHeader = request.headers.authorization

  if (!authHeader) throw new NotAuthorized('Token not provided')

  const token = authHeader.split(' ')[1]

  const { status, data, message } = jwtService.decodeToken(token)

  if(!status) throw new NotAuthorized(message)

  const { id, email, role } = data as Token

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
