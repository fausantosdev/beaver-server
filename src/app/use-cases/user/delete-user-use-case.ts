import { DeleteUser } from '@app/interfaces/use-cases/user/delete-user'
import { IUserRepository } from '@domain/repositories/i-user-repository'
import { AppError } from '@shared/errors/app-error'
import { isCustomErrorHelper } from '@shared/utils/is-cuscom-error-helper'
import { response } from '@shared/utils/response-helper'

class DeleteUserUseCase implements DeleteUser {
  constructor(
    private userRepository: IUserRepository
  ) {}

  public execute = async (id: string) => {
    try {
      const userExists = await this.userRepository.findOne({ id })

      if (!userExists) throw new AppError('User not found')

      const result = await this.userRepository.delete({ id })

      return response({ data: !!result })
    } catch (error) {
      return response({
        status: false,
        message: isCustomErrorHelper(error) ? error.message : 'Internal server error'
      })
    }
  }
}

export { DeleteUserUseCase }
