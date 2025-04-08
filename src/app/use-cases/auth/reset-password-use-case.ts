import { ResetPasswordDto } from '@dtos/auth-dtos'
import { UserDto } from '@dtos/user.dtos'
import { NotAuthorized } from '@errors/not-authorized'
import { Repository } from '@protocols/repository'
import { Encryption } from '@protocols/services/encryption'
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
    try {
      const userExists = await this.userRepository.findOne({ email }) as UserDto

      if (!userExists) throw new NotAuthorized('E-mail not found')

      if(token !== userExists.password_reset_token) throw new NotAuthorized('Invalid password recovery token')

      if (userExists.password_reset_expires && (new Date() > userExists.password_reset_expires)) {
        throw new NotAuthorized('Token expired, request a new one')
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
    } catch (error) {
      return response({
        status: false,
        message: error instanceof NotAuthorized ? error.message : 'Internal server error'
      })
    }
  }
}

export { ResetPasswordUseCase }
