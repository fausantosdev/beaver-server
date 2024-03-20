import { compare } from '../../lib/bcrypt'
import { generateToken } from 'src/lib/jwt'

import { UserRepository } from '../repositories/user.repository'

type Auth = {
  email: string
  password: string
}

class AuthService {
  private repository: UserRepository

  constructor() {
    this.repository = new UserRepository()
  }

  public signIn = async ({ email, password }: Auth) => {
    const user = await this.repository.findOne({ email })

    if ( !user || (!(user && (await compare(password, user.password_hash)))) ) throw new Error('Authentication failed, check your credentials')

    const jwt = generateToken({
      id: user.id,
      email: user.email
    })

    return jwt
  }
}

export { AuthService }