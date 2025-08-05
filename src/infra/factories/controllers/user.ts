import { createUserUseCases } from '@infra/factories/use-cases/user'
import { UserController } from '@infra/http/controllers/user-controller'

export function createUserControllers() {
  const userUseCases = createUserUseCases()
  const userController = new UserController(
    userUseCases.create,
    userUseCases.get,
    userUseCases.edit,
    userUseCases.delete
  )

  return {
    create: userController.create,
    read: userController.read,
    update: userController.update,
    delete: userController.delete
  }
}
