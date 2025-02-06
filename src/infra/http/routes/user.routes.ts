import { FastifyInstance } from 'fastify'

import { checkUserOrIsAdmin,isAdmin } from '@middlewares/auth.middleware'

import { createUserControllers } from '@controllers/user'

const userControllers = createUserControllers()

export async function userRoutes (app: FastifyInstance) {
  app.post('/', userControllers.create.handle)

  app.get('/:id', { preHandler: [checkUserOrIsAdmin] }, userControllers.get.handle)

  app.put('/:id', { preHandler: [checkUserOrIsAdmin] }, userControllers.edit.handle)

  app.delete('/:id', { preHandler: [checkUserOrIsAdmin] }, userControllers.delete.handle)
}
