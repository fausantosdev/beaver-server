import { FastifyInstance } from 'fastify'

import { AuthController } from '../app/http/controllers/auth.controller'
import { UserController } from '../app/http/controllers/user.controller'

import { verifyToken } from '../app/http/middlewares/auth.middleware'

const authController = new AuthController()
const userController = new UserController()

export async function authRoutes (app: FastifyInstance) {
  app.post('/sign-in', authController.signIn)
  app.post('/sign-up', userController.store)
  app.post('/token-refresh', { preHandler: [verifyToken] }, authController.tokenRefresh)
  app.post('/forgot-password', authController.forgotPassword)
  app.post('/reset-password', authController.resetPassword)
}