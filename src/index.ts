import Fastify from 'fastify'
import cors from '@fastify/cors'
import 'dotenv/config'

import { Routes } from './app/routes'

const app = Fastify()

app.register(cors)

Routes(app)

app.listen({
    port: Number(process.env.PORT)
}).then(() => {
    console.log('~ server running on port 3333')
})