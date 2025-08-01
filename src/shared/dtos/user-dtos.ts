type CreateUserDto = {
  name: string
  email: string
  password_hash: string
}

type UpdateUserDto = {
  id: string
  data: {
    name?: string
    email?: string
    role?: string
    password_hash?: string
  }
}

export {
  CreateUserDto,
  UpdateUserDto
}
