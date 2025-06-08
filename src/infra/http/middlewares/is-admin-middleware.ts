import { Jwt } from '@app/interfaces/services/jwt'
import { NotAuthorized } from '@shared/errors/not-authorized'
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'

import { IsAuthenticateMiddleware } from './is-authenticate-middleware'

class IsAdminMiddleware extends IsAuthenticateMiddleware {
  constructor (
    jwtService: Jwt
  ) {
    super(jwtService)
  }

  public handle = (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction): void => {
    super.handle(request, reply, () => {
      if (request.user.role === 'admin') {
        return done()
      }else{
        throw new NotAuthorized('Restricted')
      }
    })
  }
}

export { IsAdminMiddleware }
