import { Encryption } from '@app/interfaces/services/encryption'
import { User } from '@domain/entities/user'
import { IUserRepository } from '@domain/repositories/i-user-repository'
import { CreateUserDto } from '@shared/dtos/user-dtos'
import { AppError } from '@shared/errors/app-error'
import { isCustomErrorHelper } from '@shared/utils/is-cuscom-error-helper'
import { response } from '@shared/utils/response-helper'

class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private encryptionService: Encryption
  ) {}

  public execute = async ({ name, email, password_hash }: CreateUserDto) => {
    try {
      const emailExists = await this.userRepository.findOne({ email }) as User

      if (emailExists) throw new AppError('This email is already registered in our system')

      const user = new User({
        name,
        email,
        password_hash: (await this.encryptionService.hash(password_hash, 8)).data
      })

      const newUser = await this.userRepository.create(user)

      return response({ data: newUser })
    } catch (error) {

      return response({
        status: false,
        message: isCustomErrorHelper(error) ? error.message : 'Internal server error'
      })
    }
  }
}

export { CreateUserUseCase }
