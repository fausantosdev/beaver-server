type CreateTaskDto = {
  parent_id?: string | null
  user_id: string
  description: string
}

type EditTaskDto = {
  description?: string
  progress?: number
}

export {
  CreateTaskDto,
  EditTaskDto
}
