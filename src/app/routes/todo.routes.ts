import { FastifyInstance } from 'fastify'

import { TodoController } from '../controllers/todo.controller'

const todoController = new TodoController()

export async function todoRoutes (app: FastifyInstance) {
  app.post('/', todoController.store)
  app.get('/:userId/:id?', todoController.readByUser)
  app.patch('/', todoController.update)
  app.delete('/', todoController.delete)
}