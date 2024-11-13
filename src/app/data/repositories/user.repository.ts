import { CreateUserDto } from '@dtos/user.dtos'
import { prisma } from '@lib/prisma'
import { Prisma, User } from '@prisma/client'

class UserRepository {
  public create = async ({ name, email, password_hash }: CreateUserDto): Promise<User> => {
    return await prisma.user.create({
      data: {
        name,
        email,
        password_hash
      }
    })
  }

  public read = async (where: Prisma.UserWhereInput): Promise<User[]> => {
    return await prisma.user.findMany({ where })
  }

  public findOne = async (where: Prisma.UserWhereUniqueInput): Promise<User | null> => {
    return await prisma.user.findUnique({ where })
  }

  public update = async (where: Prisma.UserWhereUniqueInput, data: object): Promise<User> => {
    return prisma.user.update({
      where, data
    })
  }

  public delete = async (where: Prisma.UserWhereUniqueInput): Promise<User | null> => {
    return await prisma.user.delete({ where })
  }
}

export { UserRepository }
