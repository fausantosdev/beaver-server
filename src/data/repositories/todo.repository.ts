import { CreateTodoDto,TodoDto } from '@dtos/todo.dtos'
import { prisma } from '@lib/prisma'
import { Prisma } from '@prisma/client'
import { Repository } from '@protocols/repository'

class TodoRepository implements Repository {
  public create = async ({ userId, title }: CreateTodoDto): Promise<TodoDto> => {
    return await prisma.instance.todo.create({
      data: {
        userId,
        title
      }
    })
  }

  public read = async (where: Prisma.TodoWhereInput): Promise<TodoDto[]> => {
    return await prisma.instance.todo.findMany({ where })
  }

  public findOne = async (where: Prisma.TodoWhereUniqueInput): Promise<TodoDto | null> => {
    return await prisma.instance.todo.findUnique({ where })
  }

  public update = async (where: Prisma.TodoWhereUniqueInput, data: object): Promise<TodoDto> => {
    return prisma.instance.todo.update({
      where, data
    })
  }

  public delete = async (where: Prisma.TodoWhereUniqueInput): Promise<TodoDto> => {
    return await prisma.instance.todo.delete({ where })
  }
}

export { TodoRepository }
