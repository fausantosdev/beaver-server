import { Jwt } from '@app/interfaces/services/jwt'
import { User } from '@domain/entities/user'
import { IUserRepository } from '@domain/repositories/i-user-repository'
import { JwtPayloadDto } from '@shared/dtos/auth-dtos'
import { NotAuthorized } from '@shared/errors/not-authorized'
import { isCustomErrorHelper } from '@shared/utils/is-cuscom-error-helper'
import { response } from '@shared/utils/response-helper'

class RefreshTokenUseCase {
  constructor(
    private userRepository: IUserRepository,
    private jwtHelper: Jwt
  ) {}

  public execute = async (token: string) => {
    try {
      const decodedToken = this.jwtHelper.decodeToken(token)

      if (!decodedToken.status) throw new NotAuthorized(decodedToken.message!)

      const { id } = decodedToken.data as JwtPayloadDto

      const userExists = await this.userRepository.findOne({ id }) as User

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
