import { createAuthControllers } from '@infra/di/controllers/auth'
import { createMiddlewares } from '@infra/http/middlewares/index'
import { FastifyInstance } from 'fastify'

const authControllers = createAuthControllers()
const middlewares = createMiddlewares()

export async function authRoutes(app: FastifyInstance) {
  app.post('/sign-in', authControllers.signIn.handle)

  app.post(
    '/token-refresh',
    {
      preHandler: [
        middlewares.authMiddleware.verifyToken
      ]
    },
    authControllers.refreshToken.handle
  )

  app.post('/forgot-password', authControllers.forgotPassword.handle)

  app.post('/reset-password', authControllers.resetPassword.handle)
}
