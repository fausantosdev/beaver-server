import 'dotenv/config'

import cors from '@fastify/cors'
import Fastify from 'fastify'

import { routes } from './routes'

const app = Fastify()

app.register(cors)

routes(app)

app.setErrorHandler((error, request, reply) => {
  reply.status(500).send({
    status: false,
    data: null,
    message: error.message
  })
})

const port = Number(process.env.PORT) || 4004

app.listen({
  port
}).then(() => {
  console.log(`~ server running on port ${port}`)
})
