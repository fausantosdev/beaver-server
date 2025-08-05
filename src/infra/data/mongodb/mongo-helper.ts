import { env } from '@config/env'
import { mongoose } from '@config/mongo-client'

let isConnected = false

export const mongodb = {
  connect: async (): Promise<void> => {
    if (mongoose.connection.readyState !== 1 && !isConnected) {
      await mongoose.connect(env.MONGO_URL, {})
      isConnected = true
    }
  },

  disconnect: async (): Promise<void> => {
    if (isConnected) {
      await mongoose.disconnect()
      isConnected = false
    }
  },

  isConnected: (): boolean => {
    return mongoose.connection.readyState === 1
  }
}
