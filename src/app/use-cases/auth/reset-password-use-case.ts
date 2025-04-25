import { ResetPasswordDto } from '@interfaces/dtos/auth-dtos'
import { UserDto } from '@interfaces/dtos/user.dtos'
import { Repository } from '@interfaces/repository'
import { Encryption } from '@interfaces/services/encryption'
import { ResetPassword } from '@interfaces/use-cases/auth/reset-password'
import { AppError } from '@shared/errors/app-error'
import { NotAuthorized } from '@shared/errors/not-authorized'
import { isCustomErrorHelper } from '@shared/utils/is-cuscom-error-helper'
import { response } from '@shared/utils/response-helper'

class ResetPasswordUseCase implements ResetPassword {
  constructor(
    private userRepository: Repository,
    private encryptionHelper: Encryption
  ) {
    this.execute = this.execute.bind(this)
  }

  async execute({ token, email, newPassword }: ResetPasswordDto) {
    try {
      const userExists = await this.userRepository.findOne({ email }) as UserDto

      if (!userExists) throw new NotAuthorized('E-mail not found')

      if(token !== userExists.password_reset_token) throw new NotAuthorized('Invalid password recovery token')

      if (userExists.password_reset_expires && (new Date() > userExists.password_reset_expires)) {
        throw new NotAuthorized('Token expired, request a new one')
      } else {
        const updated = await this.userRepository.update({
          id: userExists.id
        }, {
          password_hash: (await this.encryptionHelper.hash(newPassword, 8)).data,
          password_reset_token: null,
          password_reset_expires: null
        })

        if (updated === null) throw new AppError('Error while updating password, try again later')

        return response({})
      }
    } catch (error) {
      return response({
        status: false,
        message: isCustomErrorHelper(error) ? error.message : 'Internal server error'
      })
    }
  }
}

export { ResetPasswordUseCase }
