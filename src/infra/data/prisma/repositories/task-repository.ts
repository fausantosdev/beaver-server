import { Task } from '@domain/entities/task'
import { ITaskRepository } from '@domain/repositories/i-task-repository'
import { prisma } from '@infra/data/prisma/prisma-helper'
import { Prisma } from '@prisma/client'

class TaskRepository implements ITaskRepository {
  public create = async ({ user_id, description, parent_id }: Prisma.TaskUncheckedCreateInput): Promise<Task> => {
    return await prisma.instance.task.create({
      data: {
        user_id,
        description,
        parent_id
      }
    })
  }

  public read = async (where: Prisma.TaskWhereInput): Promise<Task[]> => {
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

  public findOne = async (where: Prisma.TaskWhereUniqueInput): Promise<Task | null> => {
    return await prisma.instance.task.findUnique({
      where,
      include: {
        subtasks: true
      }
    })
  }

  public update = async (where: Prisma.TaskWhereUniqueInput, data: object): Promise<Task> => {
    return await prisma.instance.task.update({
      where, data
    })
  }

  public delete = async (where: Prisma.TaskWhereInput): Promise<{ count: number }> => {
    return await prisma.instance.task.deleteMany({ where })
  }
}

export { TaskRepository }
