import { FastifyInstance } from 'fastify'

import { userRoutes } from './user.routes'
import { todoRoutes } from './todo.routes'

const Routes = (app: FastifyInstance) => {
  app.register(userRoutes, { prefix: '/user' })
  app.register(todoRoutes, { prefix: '/todo' })
}

export { Routes }