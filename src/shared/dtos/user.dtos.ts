type CreateUserDto = {
  name: string
  email: string
  password_hash: string
}

type UpdateUserDto = {
  name?: string
  email?: string
  role?: string
  password?: string
  password_hash?: string
}

export {
  CreateUserDto,
  UpdateUserDto
}
