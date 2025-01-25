import { FastifyInstance } from 'fastify'

import { checkUserOrIsAdmin,isAdmin } from '@middlewares/auth.middleware'

import { createUserControllers } from '@controllers/user'

const userControllers = createUserControllers()

export async function userRoutes (app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const result = await userControllers.create.handle(request)

    return reply.send(result)
  })

  app.get('/:id?', { preHandler: [checkUserOrIsAdmin] }, async (request, reply) => {
    const result = await userControllers.get.handle(request)

    return reply.send(result)
  })

  app.put('/:id', { preHandler: [checkUserOrIsAdmin] }, async (request, reply) => {
    const result = await userControllers.edit.handle(request)

    return reply.send(result)
  })

  app.delete('/:id', { preHandler: [checkUserOrIsAdmin] }, async (request, reply) => {
    const result = await userControllers.delete.handle(request)

    return reply.send(result)
  })
}
