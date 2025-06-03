import { JwtService } from '@infra/services/jwt-service'

import { AuthMiddleware } from './auth-middleware'

export function createMiddlewares() {
  return {
    authMiddleware: new AuthMiddleware(new JwtService())
  }
}
