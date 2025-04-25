import { SignInDto } from '@interfaces/dtos/auth-dtos'
import { UserDto } from '@interfaces/dtos/user.dtos'
import { Repository } from '@interfaces/repository'
import { Encryption } from '@interfaces/services/encryption'
import { Jwt } from '@interfaces/services/jwt'
import { SignIn } from '@interfaces/use-cases/auth/sign-in'
import { NotAuthorized } from '@shared/errors/not-authorized'
import { isCustomErrorHelper } from '@shared/utils/is-cuscom-error-helper'
import { response } from '@shared/utils/response-helper'

class SignInUseCase implements SignIn {
  constructor(
    private userRepository: Repository,
    private encryptionHelper: Encryption,
    private jwtHelper: Jwt
  ) {
    this.execute = this.execute.bind(this)
  }

  async execute({ email, password }: SignInDto) {
    try {
      const user = await this.userRepository.findOne({ email }) as UserDto

      if ( !user ) throw new NotAuthorized('Authentication failed, check your credentials')

      const { status: encryptionStatus } = await this.encryptionHelper.compare(password, user.password_hash)

      if ( user && !encryptionStatus ) throw new NotAuthorized('Authentication failed, check your credentials')

      const { status, data, message } = this.jwtHelper.generateToken({
        id: user.id,
        email: user.email,
        role: user.role
      })

      if ( !status ) throw new NotAuthorized(message)

      return response({
        status,
        data,
        message
      })
    } catch (error) {
      return response({
        status: false,
        message: isCustomErrorHelper(error) ? error.message : 'Internal server error'
      })
    }
  }
}

export { SignInUseCase }
