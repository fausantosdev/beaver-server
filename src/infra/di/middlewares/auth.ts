import { AuthMiddleware } from '@infra/http/middlewares/auth-middleware'
import { JwtService } from '@infra/services/jwt-service'

export function createMiddlewares() {
  return {
    authMiddleware: new AuthMiddleware(new JwtService())
  }
}
