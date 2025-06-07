import { createTaskControllers } from '@infra/di/controllers/task'
import { createMiddlewares } from '@infra/di/middlewares/auth'
import { FastifyInstance } from 'fastify'

const tasksControllers = createTaskControllers()
const middlewares = createMiddlewares()

export async function taskRoutes (app: FastifyInstance) {
  app.post(
    '/',
    {
      preHandler: [
        middlewares.authMiddleware.verifyToken
      ]
    },
    tasksControllers.create.handle
  )

  app.get(
    '/:id?',
    {
      preHandler: [
        middlewares.authMiddleware.verifyToken
      ]
    },
    tasksControllers.get.handle
  )

  app.patch(
    '/:id',
    {
      preHandler: [
        middlewares.authMiddleware.verifyToken
      ]
    },
    tasksControllers.edit.handle
  )

  app.delete(
    '/',
    {
      preHandler: [
        middlewares.authMiddleware.verifyToken
      ]
    },
    tasksControllers.delete.handle
  )
}
