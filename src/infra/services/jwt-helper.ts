import { Response } from '@protocols/response'
import { Jwt } from '@protocols/services/jwt'
import { response } from '@utils/response-helper'
import { sign, verify } from 'jsonwebtoken'

import { env } from '../../config/env'

class JwtHelper implements Jwt {
  public generateToken(payload: object): Response {
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

  public decodeToken(token: string): Response {
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

export { JwtHelper }
