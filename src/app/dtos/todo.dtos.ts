type TodoDto = {
  id: string
  userId: string
  title: string
  progress: number
  created_at: Date
  updated_at: Date
}

type CreateTodoDto = {
  userId: string
  title: string
}

export {
  TodoDto,
  CreateTodoDto
}