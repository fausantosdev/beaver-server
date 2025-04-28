import { UserRepository } from '@data/prisma/repositories/user-repository'
import { EncryptionService} from '@lib/encryption-service'

import { CreateUserUseCase } from './create-user-use-case'
import { DeleteUserUseCase } from './delete-user-use-case'
import { EditUserUseCase } from './edit-user-use-case'
import { GetUsersUseCase } from './get-users-use-case'

export function createUserUseCases() {
  const userRepository = new UserRepository()
  const encryptionService = new EncryptionService()

  return {
    create: new CreateUserUseCase(userRepository, encryptionService),
    get: new GetUsersUseCase(userRepository),
    edit: new EditUserUseCase(userRepository, encryptionService),
    delete: new DeleteUserUseCase(userRepository),
  }
}
