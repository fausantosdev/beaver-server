import { Response } from '../response'

export interface Jwt {
  generateToken(payload: object): Response
  decodeToken(token: string): Response
}
