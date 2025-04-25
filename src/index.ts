import { env } from '@config/env'
import { prisma } from '@shared/utils/prisma-helper'

import { server } from './server'

prisma.connect()
  .then(() => {
    server.init({
      port: env.PORT,
      host: '0.0.0.0'
    })
  })
  .catch((error) => console.error(`Oops! An error occurred:\n${error}`))
