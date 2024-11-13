import { ItemController } from '@controllers/item.controller'
import { TodoController } from '@controllers/todo.controller'
import { checkUserOrIsAdmin,verifyToken } from '@middlewares/auth.middleware'
import { FastifyInstance } from 'fastify'

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
