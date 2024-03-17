
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

  public getById = async (id: string) => {
    return await this.repository.findOne({ id })
  }

  public getByEmail = async (email: string) => {
    return await this.repository.findOne({ email })
  }

  public getMany = async (where = {}) => {
    const result = await this.repository.read(where)

    return result
  }

  public edit = async (id: string, data: object) => {
    if (Object.keys(data).length === 0)  throw new Error('No data sent')

    const userExists = await this.repository.findOne({ id })

    if (!userExists) throw new Error('User not found')

    const result = await this.repository.update({ id }, data)

    return result
  }
}

export { UserService }