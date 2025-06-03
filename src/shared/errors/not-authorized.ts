export class NotAuthorized extends Error {
  public readonly statusCode: number
  public readonly details?: string

  constructor(details?: string) {
    super('Not authorized')
    this.name = 'NotAuthorized'
    this.statusCode = 401
    this.details = details
  }
}
