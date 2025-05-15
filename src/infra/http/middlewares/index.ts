import { JwtService } from '@lib/jwt-service'

import { AuthMiddleware } from './auth-middleware'

export function createMiddlewares() {
  return {
    authMiddleware: new AuthMiddleware(new JwtService())
  }
}
