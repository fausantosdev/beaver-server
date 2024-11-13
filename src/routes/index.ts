import { FastifyInstance } from 'fastify'

import { authRoutes } from './auth.routes'
import { todoRoutes } from './todo.routes'
import { userRoutes } from './user.routes'

const routes = (app: FastifyInstance) => {
  app.register(authRoutes, { prefix: '/auth' })
  app.register(userRoutes, { prefix: '/user' })
  app.register(todoRoutes, { prefix: '/todo' })
}

export { routes }
