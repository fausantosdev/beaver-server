import { hash } from '@lib/bcrypt'

import { CreateUser } from '@protocols/use-cases/user/create-user'
import { Repository } from '@protocols/repository'

import { CreateUserDto, UserDto } from '@dtos/user.dtos'

class CreateUserUseCase implements CreateUser {
  constructor(
    private userRepository: Repository
  ) {
    this.execute = this.execute.bind(this)
  }

  async execute({ name, email, password_hash }: CreateUserDto) {
    const emailExists = await this.userRepository.findOne({ email })

    if (emailExists) throw new Error('This email is already registered in our system')

    const newUser = await this.userRepository.create({
      name,
      email,
      password_hash: await hash(password_hash, 8)
    }) as UserDto

    return newUser
  }
}

export { CreateUserUseCase }
