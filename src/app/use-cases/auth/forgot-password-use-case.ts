import cripto from 'node:crypto'

import { QueueManager } from '@app/interfaces/queue/queue-manager'
import { ForgotPassword } from '@app/interfaces/use-cases/auth/forgot-password'
import { User } from '@domain/entities/user'
import { UserRepository } from '@domain/repositories/user-repository'
import { NotAuthorized } from '@shared/errors/not-authorized'
import { isCustomErrorHelper } from '@shared/utils/is-cuscom-error-helper'
import { response } from '@shared/utils/response-helper'

class ForgotPasswordUseCase implements ForgotPassword {
  constructor(
    private userRepository: UserRepository,
    private queueManager: QueueManager
  ) {}

  public execute = async (email: string) => {
    try {
      const userExists = await this.userRepository.findOne({ email }) as User

      if(!userExists) throw new NotAuthorized('E-mail not found')

      const token = cripto.randomBytes(20).toString('hex')

      const now = new Date()
      now.setHours(now.getHours() + 1)

      const updated = await this.userRepository.update(
        { id: userExists?.id },
        { password_reset_token: token, password_reset_expires: now }
      ) as User

      if (updated) {
        await this.queueManager.add('ForgotPasswordEmail', { email, token })

        return response({
          message: 'If the provided email is registered, a password recovery token has been sent. Please check your inbox and spam folder.'
        })
      } else {
        return response({
          status: false,
          message: 'An error occurred, please try later [1]'
        })
      }
    } catch (error) {
      return response({
        status: false,
        message: isCustomErrorHelper(error) ? error.message : 'Internal server error'
      })
    }
  }
}

export { ForgotPasswordUseCase }
