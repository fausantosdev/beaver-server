import { ResetPasswordDto } from '@dtos/auth-dtos'
import { UserDto } from '@dtos/user.dtos'
import { AppError } from '@errors/app-error'
import { Encryption } from '@protocols/encryption'
import { Repository } from '@protocols/repository'
import { ResetPassword } from '@protocols/use-cases/auth/reset-password'
import { response } from '@utils/response-helper'

class ResetPasswordUseCase implements ResetPassword {
  constructor(
    private userRepository: Repository,
    private encryptionHelper: Encryption
  ) {
    this.execute = this.execute.bind(this)
  }

  async execute({ token, email, newPassword }: ResetPasswordDto) {
    const userExists = await this.userRepository.findOne({ email }) as UserDto

    if (!userExists) throw new AppError('E-mail not found', 401)

    if(token !== userExists.password_reset_token) throw new AppError('Invalid password recovery token', 401)

    if (userExists.password_reset_expires && (new Date() > userExists.password_reset_expires)) {
      throw new AppError('Token expired, request a new one', 401)
    } else {
      await this.userRepository.update({
        id: userExists.id
      }, {
        password_hash: (await this.encryptionHelper.hash(newPassword, 8)).data,
        password_reset_token: null,
        password_reset_expires: null
      })

      return response({})
    }
  }
}

export { ResetPasswordUseCase }
