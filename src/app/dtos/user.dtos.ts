type UserDto = {
  id: string
  name: string
  email: string
  password_hash: string
  created_at: Date
  updated_at: Date
}

type CreateUserDto = {
  name: string
  email: string
  password_hash: string
}

export {
  UserDto,
  CreateUserDto
}