import { decodeToken, generateToken } from '@lib/jwt'

import { Repository } from '@protocols/repository'
import { RefreshToken } from '@protocols/use-cases/auth/refresh-token'

import { UserDto } from '@dtos/user.dtos'
import { JwtPayloadDto } from '@dtos/auth-dtos'

class RefreshTokenUseCase implements RefreshToken {
  constructor(
    private userRepository: Repository
  ) {
    this.userRepository = userRepository
  }
  async execute(token: string) {
    const { id } = decodeToken(token) as JwtPayloadDto

    const userExists = await this.userRepository.findOne({ id }) as UserDto

    if (!userExists) throw new Error('Invalid token, please log in again')

    const { email, role } = userExists

    const jwt = generateToken({
      id,
      email,
      role
    })

    return { jwt }
  }
}

export { RefreshTokenUseCase }
