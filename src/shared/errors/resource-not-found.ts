export class ResourceNotFound extends Error {
  public readonly statusCode: number

  constructor(details?: string) {
    super(details || 'Resource not found')
    this.name = 'ResourceNotFound'
    this.statusCode = 404
  }
}
