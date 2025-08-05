import { TaskRepository as Repository } from '@domain/repositories/task-repository'
import { prisma } from '@infra/data/prisma/prisma-helper'
import { Prisma } from '@prisma/client'

class TaskRepository implements Repository {
  public create = async ({ user_id, description, parent_id }: Prisma.TaskUncheckedCreateInput) => {
    return await prisma.instance.task.create({
      data: {
        user_id,
        description,
        parent_id
      }
    })
  }

  public read = async (where: Prisma.TaskWhereInput) => {
    return await prisma.instance.task.findMany({
      where,
      include: {
        _count: {
          select: {
            subtasks: true
          }
        }
      }
    })
  }

  public findOne = async (where: Prisma.TaskWhereUniqueInput) => {
    return await prisma.instance.task.findUnique({
      where,
      include: {
        subtasks: true
      }
    })
  }

  public update = async (where: Prisma.TaskWhereUniqueInput, data: object) => {
    return await prisma.instance.task.update({
      where, data
    })
  }

  public delete = async (where: Prisma.TaskWhereInput) => {
    return await prisma.instance.task.deleteMany({ where })
  }
}

export { TaskRepository }
