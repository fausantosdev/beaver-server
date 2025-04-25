export class NotAuthorized extends Error {
  public readonly statusCode: number
  public readonly details?: string

  constructor(message?: string, details?: string) {
    super(message || 'Not authorized')
    this.name = 'NotAuthorized'
    this.statusCode = 401
    this.details = details
  }
}
