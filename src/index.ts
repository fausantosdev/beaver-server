import { prisma } from '@data/prisma/prisma-client'

import { env } from './env'
import { server } from './server'

prisma.instance.$connect()
  .then(() => {
    server.init(env.PORT | 3337)
  })
  .catch((error) => console.error(`Oops! An error occurred:\n${error}`))
