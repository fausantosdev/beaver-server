import { JwtPayloadDto } from '@dtos/auth-dtos'
import { UserDto } from '@dtos/user.dtos'
import { Jwt } from '@protocols/jwt'
import { Repository } from '@protocols/repository'
import { RefreshToken } from '@protocols/use-cases/auth/refresh-token'

class RefreshTokenUseCase implements RefreshToken {
  constructor(
    private userRepository: Repository,
    private jwtHelper: Jwt
  ) {
    this.execute = this.execute.bind(this)
  }

  async execute(token: string) {
    const { id } = this.jwtHelper.decodeToken(token) as JwtPayloadDto

    const userExists = await this.userRepository.findOne({ id }) as UserDto

    if (!userExists) throw new Error('Invalid token, please log in again')

    const { email, role } = userExists

    const jwt = this.jwtHelper.generateToken({
      id,
      email,
      role
    })

    return { jwt }
  }
}

export { RefreshTokenUseCase }
