import { FastifyInstance } from 'fastify'

import { verifyToken } from '@middlewares/auth.middleware'

import { createAuthControllers } from '@controllers/auth'

const authControllers = createAuthControllers()

export async function authRoutes(app: FastifyInstance) {
  app.post('/sign-in', async (request, reply) => {
    const result = await authControllers.signIn.handle(request)

    return reply.send(result)
  })

  app.post('/token-refresh', { preHandler: [verifyToken] }, async (request, reply) => {
    const result = await authControllers.refreshToken.handle(request)

    return reply.send(result)
  })

  app.post('/forgot-password', async (request, reply) => {
    const result = await authControllers.forgotPassword.handle(request)

    return reply.send(result)
  })

  app.post('/reset-password', async (request, reply) => {
    const result = await authControllers.resetPassword.handle(request)

    return reply.send(result)
  })
}
