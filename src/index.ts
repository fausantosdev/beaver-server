import Fastify from 'fastify'
import cors from '@fastify/cors'
import 'dotenv/config'

import { appRoutes } from './routes'

const app = Fastify()

app.register(cors)

app.register(appRoutes, { prefix: '/' })

app.listen({
    port: Number(process.env.PORT)
}).then(() => {
    console.log('~ server running on port 3333')
})