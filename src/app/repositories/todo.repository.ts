import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'

type CreateTodo = {
  userId: string
  title: string
}

type Todo = {
  id: string
  userId: string
  title: string
  progress: number
  created_at: Date
  updated_at: Date
}

class TodoRepository {
  public create = async ({ userId, title }: CreateTodo): Promise<Todo> => {
    return await prisma.todo.create({
      data: {
        userId,
        title
      }
    })
  }

  public read = async (where: Prisma.TodoWhereInput): Promise<Todo[]> => {
    return await prisma.todo.findMany({ where })
  }

  public findOne = async (where: Prisma.TodoWhereUniqueInput): Promise<Todo | null> => {
    return await prisma.todo.findUnique({ where })
  }

  public update = async (where: Prisma.TodoWhereUniqueInput, data: object): Promise<Todo> => {
    return prisma.todo.update({
      where, data
    })
  }

  public delete = async (where: Prisma.TodoWhereUniqueInput): Promise<Todo> => {
    return await prisma.todo.delete({ where })
  }
}

export { TodoRepository }