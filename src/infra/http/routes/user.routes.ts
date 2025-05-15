import { createUserControllers } from '@controllers/user'
import { createMiddlewares } from '@middlewares/index'
import { FastifyInstance } from 'fastify'

const userControllers = createUserControllers()
const middlewares = createMiddlewares()

export async function userRoutes (app: FastifyInstance) {
  app.post('/', userControllers.create.handle)

  app.get(
    '/:id',
    {
      preHandler: [
        middlewares.authMiddleware.checkUserOrIsAdmin
      ]
    },
    userControllers.get.handle
  )

  app.put(
    '/:id',
    {
      preHandler: [
        middlewares.authMiddleware.checkUserOrIsAdmin
      ]
    },
    userControllers.edit.handle
  )

  app.delete(
    '/:id',
    {
      preHandler: [
        middlewares.authMiddleware.checkUserOrIsAdmin
      ]
    },
    userControllers.delete.handle
  )
}
