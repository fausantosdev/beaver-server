import { createTaskControllers } from '@controllers/task'
import { verifyToken } from '@middlewares/auth.middleware'
import { FastifyInstance } from 'fastify'

const tasksControllers = createTaskControllers()

export async function taskRoutes (app: FastifyInstance) {
  app.post('/', { preHandler: [verifyToken] }, tasksControllers.create.handle)

  app.get('/:id?', { preHandler: [verifyToken] }, tasksControllers.get.handle)

  app.patch('/:id', { preHandler: [verifyToken] }, tasksControllers.edit.handle)

  app.delete('/', { preHandler: [verifyToken] }, tasksControllers.delete.handle)
}
