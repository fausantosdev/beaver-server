import { sign, verify } from 'jsonwebtoken'

import { env } from '../env'

const generateToken = (payload: object): string => {
  return sign(payload, env.APP_KEY, { expiresIn: '1d' })
}

const decodeToken = (token: string) => {
  return verify(token, env.APP_KEY as string)
}

export {
  generateToken,
  decodeToken
}
