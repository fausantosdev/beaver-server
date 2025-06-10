type CreateTaskDto = {
  parent_id?: string | null
  user_id: string
  description: string
}

type EditTaskDto = {
  query: {
    description?: string
    progress?: number
  },
  where: {
    user_id: string
    id?: string
  }
}

type DeleteTaskDto = {
  user_id: string
  tasksIds?: string[]
}

export {
  CreateTaskDto,
  EditTaskDto,
  DeleteTaskDto
}
