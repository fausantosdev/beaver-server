import cripto from 'node:crypto'

import { ForgotPassword } from '@app/interfaces/use-cases/auth/forgot-password'
import { Repository } from '@domain/interfaces/repository'
import { User } from '@entities/user'
import { Email } from '@interfaces/services/email'
import { AppError } from '@shared/errors/app-error'
import { NotAuthorized } from '@shared/errors/not-authorized'
import { isCustomErrorHelper } from '@shared/utils/is-cuscom-error-helper'
import { response } from '@shared/utils/response-helper'

class ForgotPasswordUseCase implements ForgotPassword {
  constructor(
    private userRepository: Repository,
    private emailService: Email
  ) {
    this.execute = this.execute.bind(this)
  }

  async execute(email: string) {
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
        const { status, message } = await this.emailService.sendMail({
          from: 'noreply@beaversaas.com',
          to: updated.email!,
          subject: '[Beaver SaaS] - Password recovery',
          text: `Use this token to recover your password: ${token}\nIf you didn't request this recovery, just disregard this email, your data is safe.`
        })

        if (!status) {
          throw new AppError(message!)
        }

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
