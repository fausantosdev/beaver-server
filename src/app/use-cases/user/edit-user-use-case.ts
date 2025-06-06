import { Encryption } from '@app/interfaces/services/encryption'
import { User } from '@domain/entities/user'
import { IUserRepository } from '@domain/repositories/i-user-repository'
import { UpdateUserDto } from '@shared/dtos/user-dtos'
import { AppError } from '@shared/errors/app-error'
import { ResourceNotFound } from '@shared/errors/resource-not-found'
import { isCustomErrorHelper } from '@shared/utils/is-cuscom-error-helper'
import { response } from '@shared/utils/response-helper'

class EditUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private encryptionService: Encryption
  ) {}

  public execute = async (id: string, data: UpdateUserDto) => {
    try {
      if (Object.keys(data).length === 0)  throw new AppError('No data sent')

      const userExists = await this.userRepository.findOne({ id })

      if (!userExists) throw new ResourceNotFound('User not found')

      if ( 'password' in data ) {
        data.password_hash = (await this.encryptionService.hash(String(data.password), 8)).data
        delete data.password
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
