import { hash } from '@lib/bcrypt'

import { Repository } from '@protocols/repository'
import { ResetPassword } from '@protocols/use-cases/auth/reset-password'

import { UserDto } from '@dtos/user.dtos'
import { ResetPasswordDto } from '@dtos/auth-dtos'

class ResetPasswordUseCase implements ResetPassword {
  constructor(
    private userRepository: Repository
  ) {}

  async execute({ token, email, newPassword }: ResetPasswordDto): Promise<boolean> {
    const userExists = await this.userRepository.findOne({ email }) as UserDto

    if (!userExists) throw new Error('E-mail not found')

    if(token !== userExists.password_reset_token) throw new Error('Invalid password recovery token')

    if (userExists.password_reset_expires && (new Date() > userExists.password_reset_expires)) throw new Error('Token expired, request a new one')

    const updated = await this.userRepository.update({
      id: userExists.id
    }, {
      password_hash: await hash(newPassword, 8),
      password_reset_token: null,
      password_reset_expires: null
    })

    if (!updated) throw new Error('An error occurred while updating your password, please try again')

    return true
  }
}

export { ResetPasswordUseCase }
