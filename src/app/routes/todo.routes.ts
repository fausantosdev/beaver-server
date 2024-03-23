import { FastifyInstance } from 'fastify'

import { TodoController } from '../controllers/todo.controller'

import { isAdmin, checkUserOrIsAdmin } from 'src/plugins/auth.plugin'

const todoController = new TodoController()

export async function todoRoutes (app: FastifyInstance) {
  app.post('/', { preHandler: [checkUserOrIsAdmin] }, todoController.store) 
  app.get('/:userId/:id?', { preHandler: [checkUserOrIsAdmin] }, todoController.readByUser)
  app.patch('/', { preHandler: [checkUserOrIsAdmin] }, todoController.update)
  app.delete('/', { preHandler: [checkUserOrIsAdmin] }, todoController.delete)
}