import { env } from '@config/env'
import { createClient } from 'redis'

const client = createClient({
  url: env.REDIS_CONECTION_STRING
})

client.on('error', (err) => {
  console.error('x redis client error', err)
})

export const redis = {
  connect: async () => {
    if (!client.isOpen) {
      await client.connect()
      console.log('~ redis connected')
    }
  },

  disconnect: () => {
    if (client.isOpen) {
      client.destroy()
      console.log('~ redis disconected')
    }
  },

  set: async (key: string, value: string, expireInSeconds?: number) => {
    await client.set(key, value, {
      // condition: 'XX',
      // NX-- Defina a chave somente se ela ainda não existir.
      // XX-- Defina a chave somente se ela já existir.
    })

    if (expireInSeconds) {
      await client.expire(key, expireInSeconds)
    }
  },

  get: async (key: string) => {
    return await client.get(key)
  },

  delete: async (key: string) => {
    await client.del(key)
  }
}
