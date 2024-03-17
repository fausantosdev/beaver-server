
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
    
    const emailExists = await this.repository.findOne({ email })

    if (emailExists) throw new Error('This email is already registered in our system')

    const newUser = await this.repository.create({ name, email, password })

    return newUser
  }
}

export { UserService }