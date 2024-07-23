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

type ItemDto = {
  todoId: string
  description: string
  done: boolean
  created_at: Date
  updated_at: Date
}

type CreateItemDto = {
  todoId: string
  description: string 
}

type EditTodoDto = {
  title?: string
  progress?: number
}

export {
  TodoDto,
  CreateTodoDto,
  ItemDto,
  CreateItemDto,
  EditTodoDto
}