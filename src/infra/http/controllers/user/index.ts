import { createUserUseCases } from '@usecases/user'

import { CreateUserController } from './create-user-controller'
import { DeleteUserController } from './delete-user-controller'
import { EditUserController } from './edit-user-controller'
import { GetUsersController } from './get-users-controller'

export function createUserControllers() {
  const userUseCases = createUserUseCases()

  return {
    create: new CreateUserController(userUseCases.create),
    get: new GetUsersController(userUseCases.get),
    edit: new EditUserController(userUseCases.edit),
    delete: new DeleteUserController(userUseCases.delete)
  }
}
