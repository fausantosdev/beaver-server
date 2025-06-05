import { Response } from '@shared/types/response'

export interface Jwt {
  generateToken(payload: object): Response
  decodeToken(token: string): Response
}
