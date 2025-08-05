import { GetUsers } from '@app/interfaces/use-cases/user/get-users'
import { User } from '@domain/entities/user'
import { UserRepository } from '@domain/repositories/user-repository'
import { isCustomErrorHelper } from '@shared/utils/is-cuscom-error-helper'
import { response } from '@shared/utils/response-helper'

class GetUsersUseCase implements GetUsers {
  constructor(
    private userRepository: UserRepository
  ) {}

  public execute = async (where?: object) => {
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
        result = await this.userRepository.findOne(where) as User
      } else {
        result = await this.userRepository.read(where!) as User[]
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
