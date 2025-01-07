import { hash } from '@lib/bcrypt'

import { Repository } from '@protocols/repository'
import { CreateUserDto, UserDto } from '@dtos/user.dtos'
import { DeleteUser } from '@protocols/use-cases/user/delete-user'

class DeleteUserUseCase implements DeleteUser {
  constructor(
    private userRepository: Repository
  ) {
    this.userRepository = userRepository
  }
  async execute(id: string) {
    const userExists = await this.userRepository.findOne({ id })

    if (!userExists) throw new Error('User not found')

    const result = await this.userRepository.delete({ id })

    return !!result
  }
}

export { DeleteUserUseCase }
