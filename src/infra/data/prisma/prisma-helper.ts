import { prismaInstance } from '@config/prisma-client'

let isConnected = false
// This is a helper to manage the Prisma client connection state.

export const prisma = {
  instance: prismaInstance,

  async connect() {
    if (!isConnected) {
      await prismaInstance.$connect()
      isConnected = true
      console.log('~ connected to the database')
    }
  },

  async disconnect() {
    if (isConnected) {
      await prismaInstance.$disconnect()
      isConnected = false
      console.log('~ disconnected from the database')
    }
  }
}
