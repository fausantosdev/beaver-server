import { UserRepository } from '@data/prisma/repositories/user-repository'
import { EncryptionHelper } from '@lib/encryption-helper'

import { CreateUserUseCase } from './create-user-use-case'
import { DeleteUserUseCase } from './delete-user-use-case'
import { EditUserUseCase } from './edit-user-use-case'
import { GetUsersUseCase } from './get-users-use-case'

export function createUserUseCases() {
  const userRepository = new UserRepository()
  const encryptionHelper = new EncryptionHelper()

  return {
    create: new CreateUserUseCase(userRepository, encryptionHelper),
    get: new GetUsersUseCase(userRepository),
    edit: new EditUserUseCase(userRepository, encryptionHelper),
    delete: new DeleteUserUseCase(userRepository),
  }
}
