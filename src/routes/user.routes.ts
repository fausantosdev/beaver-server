import { FastifyInstance } from 'fastify'

import { UserController } from '@controllers/user.controller'

import { isAdmin, checkUserOrIsAdmin } from '@middlewares/auth.middleware'

const userController = new UserController()

export async function userRoutes (app: FastifyInstance) {
  app.post('/', userController.store)

  app.get('/', { preHandler: [isAdmin] }, userController.read)

  app.get('/:id', { preHandler: [checkUserOrIsAdmin] }, userController.show)

  app.put('/:id?', { preHandler: [checkUserOrIsAdmin] }, userController.update)

  app.delete('/:id?', { preHandler: [checkUserOrIsAdmin] }, userController.delete)
}