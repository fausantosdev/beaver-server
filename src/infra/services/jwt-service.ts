import { Jwt } from '@app/interfaces/services/jwt'
import { env } from '@config/env'
import { response } from '@shared/utils/response-helper'
import { sign, verify } from 'jsonwebtoken'

class JwtService implements Jwt {
  public generateToken(payload: object) {
    try {
      const token = sign(payload, env.APP_KEY, { expiresIn: '1d' })
      return response({
        data: token
      })
    } catch (error) {
      return response({
        status: false,
        message: 'Error generating token, please try again'
      })
    }
  }

  public decodeToken(token: string) {
    try {
      const decoded = verify(token, env.APP_KEY as string)
      return response({
        data: decoded
      })
    } catch (error: any) {
      return response({
        status: false,
        message: 'Invalid or expired token, please, log in again.'
      })
    }
  }
}

export { JwtService }
