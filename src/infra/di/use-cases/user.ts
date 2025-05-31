import { CreateUserUseCase } from '@app/use-cases/user/create-user-use-case'
import { DeleteUserUseCase } from '@app/use-cases/user/delete-user-use-case'
import { EditUserUseCase } from '@app/use-cases/user/edit-user-use-case'
import { GetUsersUseCase } from '@app/use-cases/user/get-users-use-case'
import { UserRepository } from '@data/repositories/user-repository'
import { EncryptionService} from '@lib/encryption-service'

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
