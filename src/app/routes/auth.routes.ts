import { FastifyInstance } from 'fastify'

import { AuthController } from '../controllers/auth.controller'
import { UserController } from '../controllers/user.controller'

import { verifyToken } from 'src/plugins/auth.plugin'

const authController = new AuthController()
const userController = new UserController()

export async function authRoutes (app: FastifyInstance) {
  app.post('/sign-in', authController.signIn)
  app.post('/sign-up', userController.store)
  app.post('/token-refresh', { preHandler: [verifyToken] }, authController.tokenRefresh)
}