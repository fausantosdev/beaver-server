import { env } from '@config/env'
import { prisma } from '@infra/data/prisma/prisma-helper'
import { redis } from '@infra/data/redis/redis-helper'
import { QueueManager } from '@infra/services/queue-manager'

import { server } from './server'

prisma.connect()
  .then(async () => {
    await redis.connect()
    server.init({
      port: env.PORT,
      host: '0.0.0.0'
    })

    new QueueManager().processQueues()
  })
  .catch((error) => console.error(`Oops! An error occurred:\n${error}`))
