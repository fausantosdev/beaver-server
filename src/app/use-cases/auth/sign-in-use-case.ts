import { SignInDto } from '@dtos/auth-dtos'
import { UserDto } from '@dtos/user.dtos'
import { AppError } from '@errors/app-error'
import { Encryption } from '@protocols/encryption'
import { Jwt } from '@protocols/jwt'
import { Repository } from '@protocols/repository'
import { SignIn } from '@protocols/use-cases/auth/sign-in'

class SignInUseCase implements SignIn {
  constructor(
    private userRepository: Repository,
    private encryptionHelper: Encryption,
    private jwtHelper: Jwt
  ) {
    this.execute = this.execute.bind(this)
  }

  async execute({ email, password }: SignInDto) {
    const user = await this.userRepository.findOne({ email }) as UserDto

    if ( !user || (!(user && (await this.encryptionHelper.compare(password, user.password_hash)))) ) throw new AppError('Authentication failed, check your credentials', 401)

    const jwt = this.jwtHelper.generateToken({
      id: user.id,
      email: user.email,
      role: user.role
    })

    return { jwt }
  }
}

export { SignInUseCase }
