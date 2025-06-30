import { env } from '@config/env'
import { mongoose } from '@config/mongo-client'

export const mongodb = {
  connect: async () => {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(env.MONGO_URL, {})
    }
  },

  disconnect: async () => {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect()
    }
  },

  isConnected: () => {
    return mongoose.connection.readyState === 1
  }
}
