import { EditUser } from '@app/interfaces/use-cases/user/edit-user'
import { Repository } from '@domain/interfaces/repository'
import { UpdateUserDto, UserDto } from '@interfaces/dtos/user.dtos'
import { Encryption } from '@interfaces/services/encryption'
import { AppError } from '@shared/errors/app-error'
import { isCustomErrorHelper } from '@shared/utils/is-cuscom-error-helper'
import { response } from '@shared/utils/response-helper'

class EditUserUseCase implements EditUser {
  constructor(
    private userRepository: Repository,
    private encryptionService: Encryption
  ) {
    this.execute = this.execute.bind(this)
  }

  async execute(id: string, data: UpdateUserDto) {
    try {
      if (Object.keys(data).length === 0)  throw new Error('No data sent')

      const userExists = await this.userRepository.findOne({ id })

      if (!userExists) throw new AppError('User not found')

      if ( 'password' in data ) {
        data.password_hash = (await this.encryptionService.hash(String(data.password), 8)).data
        delete data.password
      }

      const result = await this.userRepository.update({ id }, data) as UserDto

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
