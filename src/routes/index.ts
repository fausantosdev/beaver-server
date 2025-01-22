import { FastifyInstance } from 'fastify'

import { authRoutes } from './auth.routes'
import { taskRoutes } from './task.routes'
import { userRoutes } from './user.routes'

const routes = (app: FastifyInstance) => {
  app.register(authRoutes, { prefix: '/auth' })
  app.register(userRoutes, { prefix: '/user' })
  app.register(taskRoutes, { prefix: '/task' })
}

export { routes }
