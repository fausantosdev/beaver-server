import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'

import { UserDto, CreateUserDto } from '../dtos/user.dtos'

class UserRepository {
  public create = async ({ name, email, password_hash }: CreateUserDto): Promise<UserDto> => {
    return await prisma.user.create({
      data: {
        name,
        email,
        password_hash
      }
    })
  }

  public read = async (where: Prisma.UserWhereInput): Promise<UserDto[]> => {
    return await prisma.user.findMany({ where })
  }

  public findOne = async (where: Prisma.UserWhereUniqueInput): Promise<UserDto> => {
    return await prisma.user.findUnique({ where })
  }

  public update = async (where: Prisma.UserWhereUniqueInput, data: object): Promise<UserDto> => {
    return prisma.user.update({
      where, data
    })
  }

  public delete = async (where: Prisma.UserWhereUniqueInput): Promise<UserDto> => {
    return await prisma.user.delete({ where })
  }
}

export { UserRepository }