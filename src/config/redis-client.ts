import { env } from '@config/env'
import { createClient } from 'redis'

const redisClient = createClient({
  url: env.REDIS_CONECTION_STRING
})

redisClient.on('error', (err) => {
  console.error('x redis client error', err)
})

export { redisClient }
