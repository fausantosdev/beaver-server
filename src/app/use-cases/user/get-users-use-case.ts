import { hash } from '@lib/bcrypt'

import { GetUsers } from '@protocols/use-cases/user/get-users'
import { Repository } from '@protocols/repository'

import { UserDto } from '@dtos/user.dtos'

class GetUsersUseCase implements GetUsers {
  constructor(
    private userRepository: Repository
  ) {}

  async execute(where?: object): Promise<UserDto[] | UserDto> {
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

    return result
  }
}

export { GetUsersUseCase }
