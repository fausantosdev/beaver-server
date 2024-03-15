import { FastifyInstance } from 'fastify'

import { UserController } from './app/controllers/user.controller'

export async function appRoutes (app: FastifyInstance) {
  app.get('/', UserController.list)
}