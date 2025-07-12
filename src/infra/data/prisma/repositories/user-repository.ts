import { User } from '@domain/entities/user'
import { IUserRepository } from '@domain/repositories/i-user-repository'
import { prisma } from '@infra/data/prisma/prisma-helper'
import { Prisma } from '@prisma/client'

class UserRepository implements IUserRepository {
  public create = async ({ name, email, password_hash }: Prisma.UserCreateInput): Promise<User> => {
    return await prisma.instance.user.create({
      data: {
        name,
        email,
        password_hash
      }
    })
  }

  public read = async (where: Prisma.UserWhereInput): Promise<User[]> => {
    return await prisma.instance.user.findMany({
      select: {
        id: true,
        name: true,
        email: true
      },
      where
    })
  }

  public findOne = async (where: Prisma.UserWhereUniqueInput): Promise<User | null> => {
    return await prisma.instance.user.findUnique({ where })
  }

  public update = async (where: Prisma.UserWhereUniqueInput, data: object): Promise<User | null> => {
    return await prisma.instance.user.update({
      where, data
    })
  }

  public delete = async (where: Prisma.UserWhereUniqueInput): Promise<User | null> => {
    return await prisma.instance.user.delete({ where })
  }
}

export { UserRepository }
