import { Task } from '@domain/entities/task'
import { ITaskRepository } from '@domain/repositories/i-task-repository'
import { Prisma } from '@prisma/client'
import { prisma } from '@shared/utils/prisma-helper'

class TaskRepository implements ITaskRepository {
  public create = async ({ user, description, parent }: Prisma.TaskCreateInput): Promise<Task> => {
    return await prisma.instance.task.create({
      data: {
        user,
        description,
        parent
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
