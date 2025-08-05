import { Encryption } from '@app/interfaces/services/encryption'
import { EditUser } from '@app/interfaces/use-cases/user/edit-user'
import { User } from '@domain/entities/user'
import { UserRepository } from '@domain/repositories/user-repository'
import { UpdateUserDto } from '@shared/dtos/user-dtos'
import { AppError } from '@shared/errors/app-error'
import { ResourceNotFound } from '@shared/errors/resource-not-found'
import { isCustomErrorHelper } from '@shared/utils/is-cuscom-error-helper'
import { response } from '@shared/utils/response-helper'

class EditUserUseCase implements EditUser {
  constructor(
    private userRepository: UserRepository,
    private encryptionService: Encryption
  ) {}

  public execute = async ({ id, data }: UpdateUserDto) => {
    try {
      if (Object.keys(data).length === 0)  throw new AppError('No data sent')

      const userExists = await this.userRepository.findOne({ id })

      if (!userExists) throw new ResourceNotFound('User not found')

      if ( 'password' in data ) {
        data.password_hash = (await this.encryptionService.hash(String(data.password), 8)).data
        delete data.password_hash
      }

      const result = await this.userRepository.update({ id }, data) as User

      return response({ data: result })
    } catch (error) {
      return response({
        status: false,
        message: isCustomErrorHelper(error) ? error.message : 'Internal server error'
      })
    }
  }
}

export { EditUserUseCase }
