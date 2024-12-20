import cors from '@fastify/cors'
import Fastify, { FastifyInstance } from 'fastify'

import { routes } from './routes'

class App {
  private readonly app: FastifyInstance

  constructor() {
    this.app = Fastify()

    this.config()
    this.routes()
  }

  private config() {
    this.app.setErrorHandler((error, request, reply) => {
      reply.status(500).send({
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

  public init(port: number) {
    this.app.listen({
      port
    }).then(() => {
      console.log('~ server running')
    })
  }
}

export const app = new App()
