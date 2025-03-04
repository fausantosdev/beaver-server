import { UserDto } from '@dtos/user.dtos'
import { Repository } from '@protocols/repository'
import { GetUsers } from '@protocols/use-cases/user/get-users'
import { response } from '@utils/response-helper'

class GetUsersUseCase implements GetUsers {
  constructor(
    private userRepository: Repository
  ) {
    this.execute = this.execute.bind(this)
  }

  async execute(where?: object) {
    let result

    if (
      where &&
      (
        ('id' in where) ||
        ('email' in where)
      )
    )
    {
      result = await this.userRepository.findOne(where) as UserDto
    } else {
      result = await this.userRepository.read(where!) as UserDto[]
    }

    return response({ data: result })
  }
}

export { GetUsersUseCase }
