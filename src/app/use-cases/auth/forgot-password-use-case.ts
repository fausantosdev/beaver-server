import cripto from 'node:crypto'

import { UserDto } from '@dtos/user.dtos'
import { AppError } from '@errors/app-error'
import { Email } from '@protocols/email'
import { Repository } from '@protocols/repository'
import { ForgotPassword } from '@protocols/use-cases/auth/forgot-password'

class ForgotPasswordUseCase implements ForgotPassword {
  constructor(
    private userRepository: Repository,
    private emailHelper: Email
  ) {
    this.execute = this.execute.bind(this)
  }

  async execute(email: string) {
    const userExists = await this.userRepository.findOne({ email }) as UserDto

    if(!userExists) throw new AppError('E-mail not found', 401)

    const token = cripto.randomBytes(20).toString('hex')

    const now = new Date()
    now.setHours(now.getHours() + 1)

    const updated = await this.userRepository.update(
      { id: userExists?.id },
      { password_reset_token: token, password_reset_expires: now }
    ) as UserDto

    if (updated.id) {
      const emailSent = await this.emailHelper.sendMail({
        to: updated.email,
        subject: '[Beaver SaaS] - Password recovery',
        text: `Use this token to recover your password: ${token}\nIf you didn't request this recovery, just disregard this email, your data is safe.`
      })

      if (!emailSent) throw new AppError('An error occurred, please try later [2]')

      return true
    } else {
      throw new AppError('An error occurred, please try later [1]')
    }
  }
}

export { ForgotPasswordUseCase }
