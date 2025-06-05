import { Jwt } from '@app/interfaces/services/jwt'
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

class AuthMiddleware {
  constructor(
    private jwtService: Jwt
  ) {}

  public verifyToken = (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
    const authHeader = request.headers.authorization

    if (!authHeader) throw new NotAuthorized('Token not provided')

    const token = authHeader.split(' ')[1]

    const { status, data, message } = this.jwtService.decodeToken(token)

    if(!status) throw new NotAuthorized(message)

    const { id, email, role } = data as Token

    request.user = { id, email, role }

    return done()
  }

  public isAdmin = (request: FastifyRequest, response: FastifyReply, done: HookHandlerDoneFunction) => {
    this.verifyToken(request, response, () => {
      if (request.user.role === 'admin') {
        return done()
      }else{
        throw new NotAuthorized('Restricted')
      }
    })
  }

  public checkUserOrIsAdmin = (request: FastifyRequest, response: FastifyReply, done: HookHandlerDoneFunction) => {
    const paramsSchema = z.object({
      id: z.string().uuid({ message: 'Incorrect ID format' })
    })

    const { id: userId } = paramsSchema.parse(request.params)

    this.verifyToken(request, response, () => {
        if(request.user.id == userId || request.user.role === 'admin'){
          return done()
        }else{
          throw new NotAuthorized('Restricted')
        }
    })
  }
}


export { AuthMiddleware }
