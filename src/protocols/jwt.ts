export interface Jwt {
  generateToken(payload: object): string
  decodeToken(token: string): object | string
}
