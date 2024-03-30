import { hash } from '../../lib/bcrypt'

import { UserRepository } from '../repositories/user.repository'

import { UserDto, CreateUserDto, UpdateUserDto } from '../dtos/user.dtos'

class UserService {
  private repository: UserRepository

  constructor() {
    this.repository = new UserRepository()
  }

  public createUser = async ({ name, email, password_hash }: CreateUserDto): Promise<UserDto> => {
    
    const emailExists = await this.repository.findOne({ email })

    if (emailExists) throw new Error('This email is already registered in our system')

    const newUser = await this.repository.create({ 
      name, 
      email, 
      password_hash: await hash(password_hash, 8)
    })

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

  public edit = async (id: string, data: UpdateUserDto) => {
    if (Object.keys(data).length === 0)  throw new Error('No data sent')

    const userExists = await this.repository.findOne({ id })

    if ( 'password' in data ) {
      data.password_hash = await hash(String(data.password), 8)
      delete data.password
    }

    if (!userExists) throw new Error('User not found')

    const result = await this.repository.update({ id }, data)

    return result
  }

  public deleteUser = async (id: string) => {
    const userExists = await this.repository.findOne({ id })

    if (!userExists) throw new Error('User not found')

    const result = await this.repository.delete({ id })

    return result
  }
}

export { UserService }