import { FastifyInstance } from 'fastify'

import { checkUserOrIsAdmin,isAdmin } from '@middlewares/auth.middleware'

import { UserRepository } from '@repositories/user-repository'
import { CreateUserUseCase } from '@usecases/user/create-user-use-case'
import { CreateUserController } from '@controllers/user/create-user-controller'
import { GetUsersUseCase } from '@usecases/user/get-users-use-case'
import { GetUsersController } from '@controllers/user/get-users-controller'
import { EditUserUseCase } from '@usecases/user/edit-user-use-case'
import { EditUserController } from '@controllers/user/edit-user-controller'
import { DeleteUserUseCase } from '@usecases/user/delete-user-use-case'
import { DeleteUserController } from '@controllers/user/delete-user-controller'

const userRepository = new UserRepository()

const createUserUseCase = new CreateUserUseCase(userRepository)
const createUserController = new CreateUserController(createUserUseCase)

const getUsersUseCase = new GetUsersUseCase(userRepository)
const getUsersController = new GetUsersController(getUsersUseCase)

const editUserUseCase = new EditUserUseCase(userRepository)
const editUserController = new EditUserController(editUserUseCase)

const deleteUserUseCase = new DeleteUserUseCase(userRepository)
const deleteUserController = new DeleteUserController(deleteUserUseCase)

export async function userRoutes (app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const result = await createUserController.handle(request)

    return reply.send(result)
  })

  app.get('/:id?', { preHandler: [isAdmin] }, async (request, reply) => {
    const result = await getUsersController.handle(request)

    return reply.send(result)
  })

  app.put('/:id', { preHandler: [checkUserOrIsAdmin] }, async (request, reply) => {
    const result = await editUserController.handle(request)

    return reply.send(result)
  })

  app.delete('/:id', { preHandler: [checkUserOrIsAdmin] }, async (request, reply) => {
    const result = await deleteUserController.handle(request)

    return reply.send(result)
  })
}
