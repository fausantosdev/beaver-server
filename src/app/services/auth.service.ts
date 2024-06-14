import { compare } from '../../lib/bcrypt'
import { generateToken, decodeToken } from 'src/lib/jwt'

import { UserRepository } from '../repositories/user.repository'

import { LoginDto } from '../dtos/auth.dtos'

class AuthService {
  private repository: UserRepository

  constructor() {
    this.repository = new UserRepository()
  }

  public signIn = async ({ email, password }: LoginDto) => {
    const user = await this.repository.findOne({ email })

    if ( !user || (!(user && (await compare(password, user.password_hash)))) ) throw new Error('Authentication failed, check your credentials')

    const jwt = generateToken({
      id: user.id,
      email: user.email,
      role: user.role
    })

    return jwt
  }



  refreshToken = async (token: string) => {
    const { id } = decodeToken(token)
    
    const userExists = await this.repository.findOne({ id })

    if (!userExists) throw new Error('Invalid token, please log in again')

    const { email, role } = userExists

    const newToken = generateToken({
      id,
      email,
      role
    })

    return newToken
  }
}

export { AuthService }