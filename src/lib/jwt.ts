import { sign, verify } from 'jsonwebtoken'

const generateToken = (payload: object): string => {
  return sign(payload, process.env.APP_KEY as string, { expiresIn: '1d' })
}

const decodeToken = (token: string) => {
  return verify(token, process.env.APP_KEY as string)
}

export {
  generateToken,
  decodeToken
}