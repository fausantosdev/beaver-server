type TaskDto = {
  id: string
  parent_id?: string | null
  user_id: string
  description: string
  progress?: number | null
  created_at: Date
  updated_at: Date
}

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
  TaskDto,
  CreateTaskDto,
  EditTaskDto
}
