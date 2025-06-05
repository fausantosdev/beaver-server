export class ResourceNotFound extends Error {
  public readonly statusCode: number
  public readonly details?: string

  constructor(details?: string) {
    super('Resource not found')
    this.name = 'ResourceNotFound'
    this.statusCode = 404
    this.details = details
  }
}
