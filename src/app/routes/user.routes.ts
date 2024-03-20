import { FastifyInstance } from 'fastify'

import { UserController } from '../controllers/user.controller'

import { verifyToken } from '../plugins/auth.plugin'

const userController = new UserController()

export async function userRoutes (app: FastifyInstance) {
  app.post('/', userController.store)

  app.get('/:id?', { preHandler: [verifyToken] }, userController.read)

  app.put('/:id?', { preHandler: [verifyToken] }, userController.update)

  app.delete('/:id?', { preHandler: [verifyToken] }, userController.delete)
}