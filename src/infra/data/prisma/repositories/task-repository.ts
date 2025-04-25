import { prisma } from '@config/prisma/prisma-client'
import { CreateTaskDto, TaskDto } from '@dtos/task-dtos'
import { Prisma } from '@prisma/client'
import { Repository } from '@protocols/repository'

class TaskRepository implements Repository {
  public create = async ({ user_id, description, parent_id }: CreateTaskDto): Promise<TaskDto> => {
    return await prisma.instance.task.create({
      data: {
        user_id,
        description,
        parent_id
      }
    })
  }

  public read = async (where: Prisma.TaskWhereInput): Promise<TaskDto[]> => {
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

  public findOne = async (where: Prisma.TaskWhereUniqueInput): Promise<TaskDto | null> => {
    return await prisma.instance.task.findUnique({
      where,
      include: {
        subtasks: true
      }
    })
  }

  public update = async (where: Prisma.TaskWhereUniqueInput, data: object): Promise<TaskDto> => {
    return await prisma.instance.task.update({
      where, data
    })
  }

  public delete = async (where: Prisma.TaskWhereInput): Promise<{ count: number }> => {
    return await prisma.instance.task.deleteMany({ where })
  }
}

export { TaskRepository }
