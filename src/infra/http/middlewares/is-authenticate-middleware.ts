import { Jwt } from '@app/interfaces/services/jwt'
import { NotAuthorized } from '@shared/errors/not-authorized'
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'

type DecodedToken = {
  id: string,
  email: string
  role: string
  iat: number
  exp: number
  sub: string
}

class IsAuthenticateMiddleware {
  constructor(
    private jwtService: Jwt
  ) {
    this.handle = this.handle.bind(this)
  }

  public handle (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction): void {
    const authHeader = request.headers.authorization

    if (!authHeader) throw new NotAuthorized('Token not provided')

    const token = authHeader.split(' ')[1]

    const { status, data, message } = this.jwtService.decodeToken(token)

    if(!status) throw new NotAuthorized(message)

    const { id, email, role } = data as DecodedToken

    request.user = { id, email, role }

    return done()
  }
}

export { IsAuthenticateMiddleware }

/**
 * Erro:
 * Class field 'handle' defined by the parent class is not accessible in the child
 * class via super.ts(2855)
 *
 * Explicação:
 * Esse erro ocorre porque a sua classe base (IsAuthenticateMiddleware) define
 * handle como um campo de classe (field) com uma arrow function, e campos de classe
 * não podem ser acessados via super — nem mesmo em tempo de execução, muito menos
 * pelo TypeScript.
 *
 * Solução:
 * Transformar handle de arrow function para método tradicional
 */
