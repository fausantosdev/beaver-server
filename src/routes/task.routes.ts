import { FastifyInstance } from 'fastify'
import { checkUserOrIsAdmin,verifyToken } from '@middlewares/auth.middleware'

import { TaskRepository } from '@repositories/task-repository'
import { CreateTaskUseCase } from '@usecases/task/create-task-use-case'
import { CreateTaskController } from '@controllers/task/create-task-controller'
import { GetTasksUseCase } from '@usecases/task/get-tasks-use-case'
import { GetTasksController } from '@controllers/task/get-tasks-controller'
import { EditTaskUseCase } from '@usecases/task/edit-task-use-case'
import { EditTaskController } from '@controllers/task/edit-task-controller'
import { DeleteTasksUseCase } from '@usecases/task/delete-tasks-use-case'
import { DeleteTasksController } from '@controllers/task/delete-tasks-controller'

const taskRepository = new TaskRepository()

const createTaskUseCase = new CreateTaskUseCase(taskRepository)
const createTaskController = new CreateTaskController(createTaskUseCase)

const getTasksUseCase = new GetTasksUseCase(taskRepository)
const getTaskController = new GetTasksController(getTasksUseCase)

const editTaskUseCase = new EditTaskUseCase(taskRepository)
const editTaskController = new EditTaskController(editTaskUseCase)

const deleteTaskUseCase = new DeleteTasksUseCase(taskRepository)
const deleteTaskController = new DeleteTasksController(deleteTaskUseCase)

export async function taskRoutes (app: FastifyInstance) {
  app.post('/', { preHandler: [verifyToken] }, async (request, reply) => {
    const result = await createTaskController.handle(request)

    return reply.send(result)
  })

  app.get('/:id?', { preHandler: [verifyToken] }, async (request, reply) => {
    const result = await getTaskController.handle(request)

    return reply.send(result)
  })

  app.patch('/:id', { preHandler: [verifyToken] }, async (request, reply) => {
    const result = await editTaskController.handle(request)

    return reply.send(result)
  })

  app.delete('/', { preHandler: [verifyToken] }, async (request, reply) => {
    const result = await deleteTaskController.handle(request)

    return reply.send(result)
  })
}
