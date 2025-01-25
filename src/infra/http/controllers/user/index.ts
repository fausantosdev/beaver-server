import { CreateUserController } from './create-user-controller'
import { GetUsersController } from './get-users-controller'
import { EditUserController } from './edit-user-controller'
import { DeleteUserController } from './delete-user-controller'

import { createUserUseCases } from '@usecases/user'

export function createUserControllers() {
  const userUseCases = createUserUseCases()

  return {
    create: new CreateUserController(userUseCases.create),
    get: new GetUsersController(userUseCases.get),
    edit: new EditUserController(userUseCases.edit),
    delete: new DeleteUserController(userUseCases.delete)
  }
}
