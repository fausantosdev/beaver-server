import { JwtPayloadDto } from '@interfaces/dtos/auth-dtos'
import { UserDto } from '@interfaces/dtos/user.dtos'
import { Repository } from '@interfaces/repository'
import { Jwt } from '@interfaces/services/jwt'
import { RefreshToken } from '@interfaces/use-cases/auth/refresh-token'
import { NotAuthorized } from '@shared/errors/not-authorized'
import { isCustomErrorHelper } from '@shared/utils/is-cuscom-error-helper'
import { response } from '@shared/utils/response-helper'

class RefreshTokenUseCase implements RefreshToken {
  constructor(
    private userRepository: Repository,
    private jwtHelper: Jwt
  ) {
    this.execute = this.execute.bind(this)
  }

  async execute(token: string) {
    try {
      const decodedToken = this.jwtHelper.decodeToken(token)

      if (!decodedToken.status) throw new NotAuthorized(decodedToken.message!)

      const { id } = decodedToken.data as JwtPayloadDto

      const userExists = await this.userRepository.findOne({ id }) as UserDto

      if (!userExists) throw new NotAuthorized('Invalid token, please log in again')

      const { email, role } = userExists

      const generatedToken = this.jwtHelper.generateToken({
        id,
        email,
        role
      })

      if (!generatedToken.status) throw new NotAuthorized(generatedToken.message)

      return response({
        data: generatedToken.data as string
      })
    } catch (error) {
      return response({
        status: false,
        message: isCustomErrorHelper(error) ? error.message : 'Internal server error'
      })
    }
  }
}

export { RefreshTokenUseCase }
