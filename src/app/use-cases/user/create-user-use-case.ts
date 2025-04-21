import { CreateUserDto, UserDto } from '@dtos/user.dtos'
import { AppError } from '@errors/app-error'
import { Repository } from '@protocols/repository'
import { Encryption } from '@protocols/services/encryption'
import { CreateUser } from '@protocols/use-cases/user/create-user'
import { isCustomErrorHelper } from '@utils/is-cuscom-error-helper'
import { response } from '@utils/response-helper'

class CreateUserUseCase implements CreateUser {
  constructor(
    private userRepository: Repository,
    private encryptionHelper: Encryption
  ) {
    this.execute = this.execute.bind(this)
  }

  async execute({ name, email, password_hash }: CreateUserDto) {
    try {
      const emailExists = await this.userRepository.findOne({ email })

      if (emailExists) throw new AppError('This email is already registered in our system')

      const newUser = await this.userRepository.create({
        name,
        email,
        password_hash: (await this.encryptionHelper.hash(password_hash, 8)).data
      }) as UserDto

      return response({ data: newUser })
    } catch (error) {
      console.log(error)
      return response({
        status: false,
        message: isCustomErrorHelper(error) ? error.message : 'Internal server error'
      })
    }
  }
}

export { CreateUserUseCase }
