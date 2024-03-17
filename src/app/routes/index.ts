import { FastifyInstance } from 'fastify'

import { userRoutes } from './user.routes'

const Routes = (app: FastifyInstance) => {
  app.register(userRoutes, { prefix: '/user' })
}

export { Routes }