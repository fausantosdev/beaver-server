import { CreateUserDto } from '@dtos/user.dtos'
import { prisma } from '@data/prisma/prisma-client'
import { Prisma, User } from '@prisma/client'
import { Repository } from '@protocols/repository'

class UserRepository implements Repository {
  public create = async ({ name, email, password_hash }: CreateUserDto): Promise<User> => {
    return await prisma.instance.user.create({
      data: {
        name,
        email,
        password_hash
      }
    })
  }

  public read = async (where: Prisma.UserWhereInput): Promise<User[]> => {
    return await prisma.instance.user.findMany({ where })
  }

  public findOne = async (where: Prisma.UserWhereUniqueInput): Promise<User | null> => {
    return await prisma.instance.user.findUnique({ where })
  }

  public update = async (where: Prisma.UserWhereUniqueInput, data: object): Promise<User> => {
    return prisma.instance.user.update({
      where, data
    })
  }

  public delete = async (where: Prisma.UserWhereUniqueInput): Promise<User | null> => {
    return await prisma.instance.user.delete({ where })
  }
}

export { UserRepository }
