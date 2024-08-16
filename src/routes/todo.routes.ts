import { FastifyInstance } from 'fastify'

import { TodoController } from '../app/http/controllers/todo.controller'
import { ItemController } from '../app/http/controllers/item.controller'

import { verifyToken, checkUserOrIsAdmin } from '../app/http/middlewares/auth.middleware'

const todoController = new TodoController()
const itemController = new ItemController()

export async function todoRoutes (app: FastifyInstance) {
  app.post('/', { preHandler: [verifyToken] }, todoController.store) 
  app.get('/:id?', { preHandler: [verifyToken] }, todoController.readByUser)
  app.patch('/:id/edit', { preHandler: [verifyToken] }, todoController.update)
  app.delete('/', { preHandler: [verifyToken] }, todoController.delete)

  app.post('/item', { preHandler: [verifyToken] }, itemController.store)
  app.get('/:todoId/items', { preHandler: [verifyToken] }, itemController.readByTodo) 
  app.patch('/:todoId/item/:id/done', { preHandler: [verifyToken] }, itemController.doneItem)
  app.delete('/:todoId/item/:id/delete', { preHandler: [verifyToken] }, itemController.delete)  
}