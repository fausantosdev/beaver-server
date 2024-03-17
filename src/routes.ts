import { FastifyInstance } from 'fastify'

import { UserController } from './app/controllers/user.controller'

const userController = new UserController()

export async function appRoutes (app: FastifyInstance) {
  app.post('/', userController.store)

  app.get('/', userController.read)
}