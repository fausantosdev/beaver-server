import cors from '@fastify/cors'
import { routes } from '@routes/index'
import Fastify, { FastifyInstance, FastifyListenOptions } from 'fastify'

import { AppError } from './app/errors/app-error'
import { env } from './config/env'

class Server {
  private readonly app: FastifyInstance

  constructor() {
    this.app = Fastify()

    this.config()
    this.routes()
  }

  private config() {
    this.app.setErrorHandler((error, request, reply) => {

      const statusCode = error instanceof AppError ? error.statusCode : 500

      return reply.status(statusCode).send({
        status: false,
        data: null,
        message: error.message
      })
    })

    this.app.register(cors)
  }

  private routes() {
    routes(this.app)
  }

  public init(options: FastifyListenOptions) {
    this.app.listen(options).then(() => {
      console.log(`~ server running ${env.NODE_ENV === 'development' ? `on port ${options.port}` : ''}`)
    })
  }
}

export const server = new Server()
