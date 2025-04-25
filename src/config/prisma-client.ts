import { PrismaClient } from '@prisma/client'

export const prismaInstance = new PrismaClient({
  log: ['query']
})
