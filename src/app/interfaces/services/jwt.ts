import { Response } from '@shared/utils/response-helper'

export interface Jwt {
  generateToken(payload: object): Response
  decodeToken(token: string): Response
}
