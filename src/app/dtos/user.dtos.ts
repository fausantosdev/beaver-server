type UserDto = {
  id: string
  name: string
  email: string
  role: string
  password_hash: string
  password_reset_token: string
  password_reset_expires: Date
  created_at: Date
  updated_at: Date
}

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
  stripe_customer_id?: string
  stripe_subscription_id?: string
  stripe_subscription_status?: string
}

export {
  UserDto,
  CreateUserDto,
  UpdateUserDto
}