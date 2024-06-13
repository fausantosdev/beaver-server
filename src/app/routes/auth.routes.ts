import { FastifyInstance } from 'fastify'

import { AuthController } from '../controllers/auth.controller'
import { UserController } from '../controllers/user.controller'

const authController = new AuthController()
const userController = new UserController()

export async function authRoutes (app: FastifyInstance) {
  app.post('/sign-in', authController.signIn)
  app.post('/sign-up', userController.store)
}