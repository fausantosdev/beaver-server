import { SignIn } from '@app/interfaces/use-cases/auth/sign-in'
import { User } from '@domain/entities/user'
import { IUserRepository } from '@domain/repositories/i-user-repository'
import { Encryption } from '@interfaces/services/encryption'
import { Jwt } from '@interfaces/services/jwt'
import { SignInDto } from '@shared/dtos/auth-dtos'
import { NotAuthorized } from '@shared/errors/not-authorized'
import { isCustomErrorHelper } from '@shared/utils/is-cuscom-error-helper'
import { response } from '@shared/utils/response-helper'

class SignInUseCase implements SignIn {
  constructor(
    private userRepository: IUserRepository,
    private encryptionService: Encryption,
    private jwtHelper: Jwt
  ) {}

  public execute = async ({ email, password }: SignInDto) => {
    try {
      const user = await this.userRepository.findOne({ email }) as User

      if ( !user ) throw new NotAuthorized('Authentication failed, check your credentials')

      const { status: encryptionStatus } = await this.encryptionService.compare(password, user.password_hash!)

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
