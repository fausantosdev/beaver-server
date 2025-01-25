import { UserRepository } from '@data/prisma/repositories/user-repository'

import { CreateUserUseCase } from './create-user-use-case'
import { GetUsersUseCase } from './get-users-use-case'
import { EditUserUseCase } from './edit-user-use-case'
import { DeleteUserUseCase } from './delete-user-use-case'

export function createUserUseCases() {
  const userRepository = new UserRepository()

  return {
    create: new CreateUserUseCase(userRepository),
    get: new GetUsersUseCase(userRepository),
    edit: new EditUserUseCase(userRepository),
    delete: new DeleteUserUseCase(userRepository),
  }
}
