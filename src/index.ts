import { env } from '@config/env'
import { prisma } from '@infra/data/prisma/prisma-helper'
import { redis } from '@infra/data/redis/redis-helper'

import { server } from './server'

prisma.connect()
  .then(async () => {
    await redis.connect()
    server.init({
      port: env.PORT,
      host: '0.0.0.0'
    })
  })
  .catch((error) => console.error(`Oops! An error occurred:\n${error}`))
