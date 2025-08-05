import { EnsureSelfOrAdminMiddleware } from '@infra/http/middlewares/ensure-self-or-admin-middleware'
import { IsAdminMiddleware } from '@infra/http/middlewares/is-admin-middleware'
import { IsAuthenticateMiddleware } from '@infra/http/middlewares/is-authenticate-middleware'
import { JwtService } from '@infra/services/jwt-service'

export function createMiddlewares() {
  return {
    isAuthenticateMiddleware: new IsAuthenticateMiddleware(new JwtService()),
    IsAdminMiddleware: new IsAdminMiddleware(new JwtService()),
    ensureSelfOrAdminMiddleware: new EnsureSelfOrAdminMiddleware(new JwtService()),
  }
}
