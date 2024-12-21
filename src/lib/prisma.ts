import { PrismaClient } from '@prisma/client'

const instance = new PrismaClient({
  log: ['query']
})

export const prisma = {
  instance,

  async connect () {
    return await this.instance.$connect()
  }
}
