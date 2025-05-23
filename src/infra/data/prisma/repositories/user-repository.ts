import { Repository } from '@domain/interfaces/repository'
import { CreateUserDto } from '@interfaces/dtos/user.dtos'
import { Prisma } from '@prisma/client'
import { prisma } from '@shared/utils/prisma-helper'
import { User } from 'src/domain/entities/user'

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

  public update = async (where: Prisma.UserWhereUniqueInput, data: object): Promise<User | null> => {
    return prisma.instance.user.update({
      where, data
    })
  }

  public delete = async (where: Prisma.UserWhereUniqueInput): Promise<User | null> => {
    return await prisma.instance.user.delete({ where })
  }
}

export { UserRepository }
