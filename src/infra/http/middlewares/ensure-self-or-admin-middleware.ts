import { Jwt } from '@app/interfaces/services/jwt'
import { NotAuthorized } from '@shared/errors/not-authorized'
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'
import { z } from 'zod'

import { IsAuthenticateMiddleware } from './is-authenticate-middleware'

class EnsureSelfOrAdminMiddleware extends IsAuthenticateMiddleware {
  constructor (
    jwtService: Jwt
  ) {
    super(jwtService)
  }

  public handle = (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction): void =>{
    const paramsSchema = z.object({
      id: z.string().uuid({ message: 'Incorrect ID format' })
    })

    const { id: userId } = paramsSchema.parse(request.params)

    super.handle(request, reply, () => {
      if(request.user.id == userId || request.user.role === 'admin') {
        return done()
      }else{
        throw new NotAuthorized('Restricted')
      }
    })
  }
}

export { EnsureSelfOrAdminMiddleware }
