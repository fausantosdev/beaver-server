import { DeleteUser } from '@app/interfaces/use-cases/user/delete-user'
import { UserRepository } from '@domain/repositories/user-repository'
import { ResourceNotFound } from '@shared/errors/resource-not-found'
import { isCustomErrorHelper } from '@shared/utils/is-cuscom-error-helper'
import { response } from '@shared/utils/response-helper'

class DeleteUserUseCase implements DeleteUser {
  constructor(
    private userRepository: UserRepository
  ) {}

  public execute = async (id: string) => {
    try {
      const userExists = await this.userRepository.findOne({ id })

      if (!userExists) throw new ResourceNotFound('User not found')

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
