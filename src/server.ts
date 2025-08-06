import cors from '@fastify/cors'
import { routes } from '@infra/http/routes'
import { SocketServer } from '@infra/socket-io/socket-server'
import { AppError } from '@shared/errors/app-error'
import { isCustomErrorHelper } from '@shared/utils/is-cuscom-error-helper'
import Fastify, { FastifyInstance, FastifyListenOptions } from 'fastify'

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

      const statusCode = isCustomErrorHelper(error) ? error.message : 'Internal server error'

      return reply.status(Number(statusCode)).send({
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
    new SocketServer(this.app.server)

    this.app.listen(options).then(() => {
      console.log(`~ server running ${env.NODE_ENV === 'development' ? `on port ${options.port}` : ''}`)
    })
  }
}

export const server = new Server()
