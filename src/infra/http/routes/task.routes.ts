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
        middlewares.isAuthenticateMiddleware.handle
      ]
    },
    tasksControllers.create.handle
  )

  app.get(
    '/:id?',
    {
      preHandler: [
        middlewares.isAuthenticateMiddleware.handle
      ]
    },
    tasksControllers.get.handle
  )

  app.patch(
    '/:id',
    {
      preHandler: [
        middlewares.isAuthenticateMiddleware.handle
      ]
    },
    tasksControllers.edit.handle
  )

  app.delete(
    '/',
    {
      preHandler: [
        middlewares.isAuthenticateMiddleware.handle
      ]
    },
    tasksControllers.delete.handle
  )
}
