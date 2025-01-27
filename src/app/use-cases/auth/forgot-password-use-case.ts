import cripto from 'node:crypto'

import { Repository } from '@protocols/repository'
import { ForgotPassword } from '@protocols/use-cases/auth/forgot-password'

import { UserDto } from '@dtos/user.dtos'

import { Nodemailer } from '@lib/nodemailer'

class ForgotPasswordUseCase implements ForgotPassword {
  private mail: Nodemailer

  constructor(
    private userRepository: Repository
  ) {
    this.execute = this.execute.bind(this)
    this.mail = new Nodemailer()
  }

  async execute(email: string) {
    const userExists = await this.userRepository.findOne({ email }) as UserDto

    if(!userExists) throw new Error('E-mail not found')

    const token = cripto.randomBytes(20).toString('hex')

    const now = new Date()
    now.setHours(now.getHours() + 1)

    const updated = await this.userRepository.update(
      { id: userExists?.id },
      { password_reset_token: token, password_reset_expires: now }
    ) as UserDto

    if (updated.id) {
      const emailSent = await this.mail.sendMail({
        to: updated.email,
        subject: '[Beaver SaaS] - Password recovery',
        text: `Use this token to recover your password: ${token}\nIf you didn't request this recovery, just disregard this email, your data is safe.`
      })

      if (!emailSent) throw new Error('An error occurred, please try later [2]')

      return true
    } else {
      throw new Error('An error occurred, please try later [1]')
    }
  }
}

export { ForgotPasswordUseCase }
