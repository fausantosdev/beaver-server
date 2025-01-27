export class NotAuthorized extends Error {
  public readonly statusCode: number
  public readonly details?: string

  constructor(message: string, details?: string) {
    super(message)
    this.name = 'NotAuthorized'
    this.statusCode = 401
    this.details = details
  }
}
