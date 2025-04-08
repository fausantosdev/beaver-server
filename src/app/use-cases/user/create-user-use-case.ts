import { CreateUserDto, UserDto } from '@dtos/user.dtos'
import { Repository } from '@protocols/repository'
import { Encryption } from '@protocols/services/encryption'
import { CreateUser } from '@protocols/use-cases/user/create-user'
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

      if (emailExists) throw new Error('This email is already registered in our system')

      const newUser = await this.userRepository.create({
        name,
        email,
        password_hash: await this.encryptionHelper.hash(password_hash, 8)
      }) as UserDto

      return response({ data: newUser })
    } catch (error) {
      return response({
        status: false,
        message: 'Internal server error'
      })
    }
  }
}

export { CreateUserUseCase }
