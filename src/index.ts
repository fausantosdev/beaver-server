import { prisma } from '@data/prisma/prisma-client'

import { env } from './config/env'
import { server } from './server'

prisma.instance.$connect()
  .then(() => {
    server.init({
      port: env.PORT,
      host: '0.0.0.0'
    })
  })
  .catch((error) => console.error(`Oops! An error occurred:\n${error}`))
