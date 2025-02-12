import { createAuthControllers } from '@controllers/auth'
import { verifyToken } from '@middlewares/auth.middleware'
import { FastifyInstance } from 'fastify'

const authControllers = createAuthControllers()

export async function authRoutes(app: FastifyInstance) {
  app.post('/sign-in', authControllers.signIn.handle)

  app.post('/token-refresh', { preHandler: [verifyToken] }, authControllers.refreshToken.handle)

  app.post('/forgot-password', authControllers.forgotPassword.handle)

  app.post('/reset-password', authControllers.resetPassword.handle)
}
