import { prisma } from '@data/prisma/prisma-client'

import { env } from './env'
import { server } from './server'

const port = env.PORT

prisma.instance.$connect()
  .then(() => {
    server.init(port)
  })
  .catch((error) => console.error(`Oops! An error occurred:\n${error}`))
