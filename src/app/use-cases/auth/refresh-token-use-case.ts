import { JwtPayloadDto } from '@dtos/auth-dtos'
import { UserDto } from '@dtos/user.dtos'
import { AppError } from '@errors/app-error'
import { Repository } from '@protocols/repository'
import { Jwt } from '@protocols/services/jwt'
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

    if (!decodedToken.status) throw new AppError(decodedToken.message!, 401)

    const { id } = decodedToken.data as JwtPayloadDto

    const userExists = await this.userRepository.findOne({ id }) as UserDto

    if (!userExists) throw new AppError('Invalid token, please log in again', 401)

    const { email, role } = userExists

    const generatedToken = this.jwtHelper.generateToken({
      id,
      email,
      role
    })

    if (!generatedToken.status) throw new AppError(generatedToken.message!, 401)

    return response({
      data: generatedToken.data as string
    })
  }
}

export { RefreshTokenUseCase }
