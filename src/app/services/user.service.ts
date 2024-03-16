
import { UserRepository } from '../repositories/user.repository'

type CreateUser = {
  name: string
  email: string
  password: string
}

type User = {
  id: string
  name: string
  email: string
  password_hash: string
  created_at: Date
  updated_at: Date
}

class UserService {
  private repository: UserRepository

  constructor() {
    this.repository = new UserRepository()
  }

  public createUser = async ({ name, email, password }: CreateUser): Promise<User> => {
    const newUser = await this.repository.create({ name, email, password })

    return newUser
  }
}

export { UserService }