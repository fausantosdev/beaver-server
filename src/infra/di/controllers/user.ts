import { createUserUseCases } from '@infra/di/use-cases/user'
import { CreateUserController } from '@infra/http/controllers/user/create-user-controller'
import { DeleteUserController } from '@infra/http/controllers/user/delete-user-controller'
import { EditUserController } from '@infra/http/controllers/user/edit-user-controller'
import { GetUsersController } from '@infra/http/controllers/user/get-users-controller'

export function createUserControllers() {
  const userUseCases = createUserUseCases()

  return {
    create: new CreateUserController(userUseCases.create),
    get: new GetUsersController(userUseCases.get),
    edit: new EditUserController(userUseCases.edit),
    delete: new DeleteUserController(userUseCases.delete)
  }
}
