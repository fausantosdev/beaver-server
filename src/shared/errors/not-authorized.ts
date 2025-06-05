export class NotAuthorized extends Error {
  public readonly statusCode: number

  constructor(details?: string) {
    super(details || 'Not authorized')
    this.name = 'NotAuthorized'
    this.statusCode = 401
  }
}
