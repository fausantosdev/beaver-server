import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'

type CreateUser = {
  name: string
  email: string
  password: string
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
  public create = async ({ name, email, password }: CreateUser): Promise<User> => {
    return await prisma.user.create({
      data: {
        name,
        email,
        password_hash: password
      }
    })
  }

  public read = async (where: Prisma.UserWhereInput) => {
    return await prisma.user.findMany({ where })
  }

  public findOne = async (where: Prisma.UserWhereUniqueInput) => {
    return await prisma.user.findUnique({ where })
  }
}

export { UserRepository }