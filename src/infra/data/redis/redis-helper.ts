import { redisClient } from '@config/redis-client'

export const redis = {
  connect: async () => {
    if (!redisClient.isOpen) {
      await redisClient.connect()
      console.log('~ redis connected')
    }
  },

  disconnect: () => {
    if (redisClient.isOpen) {
      redisClient.destroy()
      console.log('~ redis disconected')
    }
  },

  set: async (key: string, value: string, expireInSeconds?: number) => {
    await redisClient.set(key, value, {
      // condition: 'XX',
      // NX-- Defina a chave somente se ela ainda não existir.
      // XX-- Defina a chave somente se ela já existir.
    })

    if (expireInSeconds) {
      await redisClient.expire(key, expireInSeconds)
    }
  },

  get: async (key: string) => {
    return await redisClient.get(key)
  },

  delete: async (key: string) => {
    await redisClient.del(key)
  }
}
