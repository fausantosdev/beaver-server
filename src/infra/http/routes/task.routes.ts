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
    tasksControllers.create
  )

  app.get(
    '/:id?',
    {
      preHandler: [
        middlewares.isAuthenticateMiddleware.handle
      ]
    },
    tasksControllers.read
  )

  app.patch(
    '/:id',
    {
      preHandler: [
        middlewares.isAuthenticateMiddleware.handle
      ]
    },
    tasksControllers.update
  )

  app.delete(
    '/',
    {
      preHandler: [
        middlewares.isAuthenticateMiddleware.handle
      ]
    },
    tasksControllers.delete
  )
}
