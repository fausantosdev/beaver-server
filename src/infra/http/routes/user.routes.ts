import { createUserControllers } from '@infra/di/controllers/user'
import { createMiddlewares } from '@infra/di/middlewares/auth'
import { FastifyInstance } from 'fastify'

const userControllers = createUserControllers()
const middlewares = createMiddlewares()

export async function userRoutes (app: FastifyInstance) {
  app.post('/', userControllers.create)

  app.get(
    '/:id',
    {
      preHandler: [
        middlewares.ensureSelfOrAdminMiddleware.handle
      ]
    },
    userControllers.read
  )

  app.put(
    '/:id',
    {
      preHandler: [
        middlewares.ensureSelfOrAdminMiddleware.handle
      ]
    },
    userControllers.update
  )

  app.delete(
    '/:id',
    {
      preHandler: [
        middlewares.ensureSelfOrAdminMiddleware.handle
      ]
    },
    userControllers.delete
  )
}
