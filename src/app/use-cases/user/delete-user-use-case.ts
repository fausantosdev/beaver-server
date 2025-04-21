import { AppError } from '@errors/app-error'
import { Repository } from '@protocols/repository'
import { DeleteUser } from '@protocols/use-cases/user/delete-user'
import { isCustomErrorHelper } from '@utils/is-cuscom-error-helper'
import { response } from '@utils/response-helper'

class DeleteUserUseCase implements DeleteUser {
  constructor(
    private userRepository: Repository
  ) {
    this.execute = this.execute.bind(this)
  }

  async execute(id: string) {
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
