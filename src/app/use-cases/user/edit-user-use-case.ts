import { hash } from '@lib/bcrypt'

import { CreateUser } from '@protocols/use-cases/user/create-user'
import { Repository } from '@protocols/repository'

import { UpdateUserDto, UserDto } from '@dtos/user.dtos'
import { EditUser } from '@protocols/use-cases/user/edit-user'

class EditUserUseCase implements EditUser {
  constructor(
    private userRepository: Repository
  ) {
    this.execute = this.execute.bind(this)
  }

  async execute(id: string, data: UpdateUserDto) {
    if (Object.keys(data).length === 0)  throw new Error('No data sent')

      const userExists = await this.userRepository.findOne({ id })

      if (!userExists) throw new Error('User not found')

      if ( 'password' in data ) {
        data.password_hash = await hash(String(data.password), 8)
        delete data.password
      }

      const result = await this.userRepository.update({ id }, data) as UserDto

      return result
  }
}

export { EditUserUseCase }
