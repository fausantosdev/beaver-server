import { prismaInstance } from '@config/prisma-client'

export const prisma = {
  instance: prismaInstance,

  async connect () {
    return await this.instance.$connect()
  }
}
