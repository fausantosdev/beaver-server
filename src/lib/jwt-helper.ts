import { Jwt } from '@protocols/jwt'
import { sign, verify } from 'jsonwebtoken'

import { env } from '../env'

class JwtHelper implements Jwt {
  public generateToken(payload: object): string {
    return sign(payload, env.APP_KEY, { expiresIn: '1d' })
  }

  public decodeToken(token: string): object | string {
    return verify(token, env.APP_KEY as string)
  }
}

export { JwtHelper }
