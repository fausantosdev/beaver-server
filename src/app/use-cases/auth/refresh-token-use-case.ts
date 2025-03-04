import { JwtPayloadDto } from '@dtos/auth-dtos'
import { UserDto } from '@dtos/user.dtos'
import { Jwt } from '@protocols/jwt'
import { Repository } from '@protocols/repository'
import { RefreshToken } from '@protocols/use-cases/auth/refresh-token'
import { response } from '@utils/response-helper'

class RefreshTokenUseCase implements RefreshToken {
  constructor(
    private userRepository: Repository,
    private jwtHelper: Jwt
  ) {
    this.execute = this.execute.bind(this)
  }

  async execute(token: string) {
    const decodedToken = this.jwtHelper.decodeToken(token)

    if (!decodedToken.status) throw new Error(decodedToken.message)

    const { id } = decodedToken.data as JwtPayloadDto

    const userExists = await this.userRepository.findOne({ id }) as UserDto

    if (!userExists) throw new Error('Invalid token, please log in again [1]')

    const { email, role } = userExists

    const generatedToken = this.jwtHelper.generateToken({
      id,
      email,
      role
    })

    if (!generatedToken.status) throw new Error(generatedToken.message)

    return response({
      data: generatedToken.data as string
    })
  }
}

export { RefreshTokenUseCase }
