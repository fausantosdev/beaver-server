import { GetUsers } from '@app/interfaces/use-cases/user/get-users'
import { Repository } from '@domain/interfaces/repository'
import { UserDto } from '@interfaces/dtos/user.dtos'
import { isCustomErrorHelper } from '@shared/utils/is-cuscom-error-helper'
import { response } from '@shared/utils/response-helper'

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
