import { UserDto } from '@interfaces/dtos/user.dtos'
import { Repository } from '@interfaces/repository'
import { GetUsers } from '@interfaces/use-cases/user/get-users'
import { isCustomErrorHelper } from '@utils/is-cuscom-error-helper'
import { response } from '@utils/response-helper'

class GetUsersUseCase implements GetUsers {
  constructor(
    private userRepository: Repository
  ) {
    this.execute = this.execute.bind(this)
  }

  async execute(where?: object) {
    let result

    try {
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
    } catch (error) {
      return response({
        status: false,
        message: isCustomErrorHelper(error) ? error.message : 'Internal server error'
      })
    }
  }
}

export { GetUsersUseCase }
