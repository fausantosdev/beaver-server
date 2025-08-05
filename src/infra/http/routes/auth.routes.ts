import { createAuthController } from '@infra/factories/controllers/auth'
import { createMiddlewares } from '@infra/factories/middlewares/auth'
import { FastifyInstance } from 'fastify'

const authController = createAuthController()
const middlewares = createMiddlewares()

export async function authRoutes(app: FastifyInstance) {
  app.post('/sign-up', authController.signUp)

  app.post('/sign-in', authController.signIn)

  app.post(
    '/token-refresh',
    {
      preHandler: [
        middlewares.isAuthenticateMiddleware.handle
      ]
    },
    authController.refreshToken
  )

  app.post('/forgot-password', authController.forgotPassword)

  app.post('/reset-password', authController.resetPassword)
}
