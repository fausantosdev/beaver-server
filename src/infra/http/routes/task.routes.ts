import { FastifyInstance } from 'fastify'
import { checkUserOrIsAdmin,verifyToken } from '@middlewares/auth.middleware'

import { createTaskControllers } from '@controllers/task'

const tasksControllers = createTaskControllers()

export async function taskRoutes (app: FastifyInstance) {
  app.post('/', { preHandler: [verifyToken] }, async (request, reply) => {
    const result = await tasksControllers.create.handle(request)

    return reply.send(result)
  })

  app.get('/:id?', { preHandler: [verifyToken] }, async (request, reply) => {
    const result = await tasksControllers.get.handle(request)

    return reply.send(result)
  })

  app.patch('/:id', { preHandler: [verifyToken] }, async (request, reply) => {
    const result = await tasksControllers.edit.handle(request)

    return reply.send(result)
  })

  app.delete('/', { preHandler: [verifyToken] }, async (request, reply) => {
    const result = await tasksControllers.delete.handle(request)

    return reply.send(result)
  })
}
