import { Repository } from '@domain/interfaces/repository'
import { User } from '@entities/user'
import { CreateUserDto } from '@interfaces/dtos/user.dtos'
import { Encryption } from '@interfaces/services/encryption'
import { CreateUser } from '@interfaces/use-cases/user/create-user'
import { AppError } from '@shared/errors/app-error'
import { isCustomErrorHelper } from '@shared/utils/is-cuscom-error-helper'
import { response } from '@shared/utils/response-helper'

class CreateUserUseCase implements CreateUser {
  constructor(
    private userRepository: Repository,
    private encryptionService: Encryption
  ) {
    this.execute = this.execute.bind(this)
  }

  async execute({ name, email, password_hash }: CreateUserDto) {
    try {
      const emailExists = await this.userRepository.findOne({ email }) as User

      if (emailExists) throw new AppError('This email is already registered in our system')

      const newUser = await this.userRepository.create({
        name,
        email,
        password_hash: (await this.encryptionService.hash(password_hash, 8)).data
      }) as User

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
