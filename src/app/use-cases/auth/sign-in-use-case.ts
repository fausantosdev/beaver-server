import { generateToken } from '@lib/jwt'
import { compare } from '@lib/bcrypt'

import { SignIn } from '@protocols/use-cases/auth/sign-in'
import { Repository } from '@protocols/repository'

import { UserDto } from '@dtos/user.dtos'
import { SignInDto } from '@dtos/auth-dtos'

import { AppError } from 'src/app/errors/app-error'

class SignInUseCase implements SignIn {
  constructor(
    private userRepository: Repository
  ) {
    this.execute = this.execute.bind(this)
  }

  async execute({ email, password }: SignInDto) {
    const user = await this.userRepository.findOne({ email }) as UserDto

    if ( !user || (!(user && (await compare(password, user.password_hash)))) ) throw new AppError('Authentication failed, check your credentials', 401)

    const jwt = generateToken({
      id: user.id,
      email: user.email,
      role: user.role
    })

    return { jwt }
  }
}

export { SignInUseCase }
