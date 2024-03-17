import { FastifyInstance } from 'fastify'

import { UserController } from '../controllers/user.controller'

const userController = new UserController()

export async function userRoutes (app: FastifyInstance) {
  app.post('/', userController.store)

  app.get('/:id?', userController.read)

  app.put('/:id?', userController.update)
}