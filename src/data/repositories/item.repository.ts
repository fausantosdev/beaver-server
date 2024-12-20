import { CreateItemDto,ItemDto } from '@dtos/todo.dtos'
import { prisma } from '@lib/prisma'
import { Prisma } from '@prisma/client'
import { Repository } from '@protocols/repository'

class ItemRepository implements Repository {
  public create = async ({ todoId, description }: CreateItemDto): Promise<ItemDto> => {
    return await prisma.instance.item.create({
      data: {
        todoId,
        description
      }
    })
  }

  public read = async (where: Prisma.ItemWhereInput): Promise<ItemDto[]> => {
    return await prisma.instance.item.findMany({ where })
  }

  public findOne = async (where: Prisma.ItemWhereUniqueInput): Promise<ItemDto | null> => {
    return await prisma.instance.item.findUnique({ where })
  }

  public update = async (where: Prisma.ItemWhereUniqueInput, data: object): Promise<ItemDto> => {
    return prisma.instance.item.update({
      where, data
    })
  }

  public delete = async (where: Prisma.ItemWhereUniqueInput): Promise<ItemDto> => {
    return await prisma.instance.item.delete({ where })
  }
}

export { ItemRepository }
