import { prisma } from '@lib/prisma'

import { app } from './app'
import { env } from './env'

prisma.instance.$connect()
  .then(() => {
    app.init(env.PORT)
  })
  .catch((error) => console.error(`Oops! An error occurred:\n${error}`))
