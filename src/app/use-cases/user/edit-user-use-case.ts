import { UpdateUserDto, UserDto } from '@dtos/user.dtos'
import { Repository } from '@protocols/repository'
import { Encryption } from '@protocols/services/encryption'
import { EditUser } from '@protocols/use-cases/user/edit-user'
import { response } from '@utils/response-helper'

class EditUserUseCase implements EditUser {
  constructor(
    private userRepository: Repository,
    private encryptionHelper: Encryption
  ) {
    this.execute = this.execute.bind(this)
  }

  async execute(id: string, data: UpdateUserDto) {
    if (Object.keys(data).length === 0)  throw new Error('No data sent')

      const userExists = await this.userRepository.findOne({ id })

      if (!userExists) throw new Error('User not found')

      if ( 'password' in data ) {
        data.password_hash = (await this.encryptionHelper.hash(String(data.password), 8)).data
        delete data.password
      }

      const result = await this.userRepository.update({ id }, data) as UserDto

      return response({ data: result })
  }
}

export { EditUserUseCase }
