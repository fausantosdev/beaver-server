import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'

type CreateUser = {
  name: string
  email: string
  password_hash: string
}

type User = {
  id: string
  name: string
  email: string
  password_hash: string
  created_at: Date
  updated_at: Date
}

class UserRepository {
  public create = async ({ name, email, password_hash }: CreateUser): Promise<User> => {
    return await prisma.user.create({
      data: {
        name,
        email,
        password_hash
      }
    })
  }

  public read = async (where: Prisma.UserWhereInput) => {
    return await prisma.user.findMany({ where })
  }

  public findOne = async (where: Prisma.UserWhereUniqueInput) => {
    return await prisma.user.findUnique({ where })
  }

  public update = async (where: Prisma.UserWhereUniqueInput, data: object) => {
    return prisma.user.update({
      where, data
    })
  }

  public delete = async (where: Prisma.UserWhereUniqueInput) => {
    return await prisma.user.delete({ where })
  }
}

export { UserRepository }