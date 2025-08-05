import { env } from '@config/env'
import { mongoose } from '@config/mongo-client'

let isConnected = false

export const mongodb = {
  connect: async (): Promise<void> => {
    if (mongoose.connection.readyState !== 1 && !isConnected) {
      try {
        await mongoose.connect(env.MONGO_URL, {})
        isConnected = true
      } catch (error) {
        console.error(`x failed to connect to mongodb: ${error}`)
      } finally {
        isConnected = false
      }
    }
  },

  disconnect: async (): Promise<void> => {
    if (mongoose.connection.readyState === 1 && isConnected) {
      try {
        await mongoose.disconnect()
        isConnected = false
      } catch (error) {
        console.error(`x failed to disconnect from mongodb: ${error}`)
      }
    }
  },

  isConnected: (): boolean => {
    return mongoose.connection.readyState === 1
  }
}
