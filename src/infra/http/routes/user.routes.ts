import { createUserControllers } from '@controllers/user'
import { checkUserOrIsAdmin } from '@middlewares/auth.middleware'
import { FastifyInstance } from 'fastify'

const userControllers = createUserControllers()

export async function userRoutes (app: FastifyInstance) {
  app.post('/', userControllers.create.handle)

  app.get('/:id', { preHandler: [checkUserOrIsAdmin] }, userControllers.get.handle)

  app.put('/:id', { preHandler: [checkUserOrIsAdmin] }, userControllers.edit.handle)

  app.delete('/:id', { preHandler: [checkUserOrIsAdmin] }, userControllers.delete.handle)
}
