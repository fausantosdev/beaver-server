import { CreateUserDto, UpdateUserDto } from '@dtos/user.dtos'
import { hash } from '@lib/bcrypt'
import { Repository } from '@protocols/repository'

class UserService {
  constructor(
    private repository: Repository
  ) {
    this.repository = repository
  }

  public createUser = async ({ name, email, password_hash }: CreateUserDto): Promise<object> => {

    const emailExists = await this.repository.findOne({ email })

    if (emailExists) throw new Error('This email is already registered in our system')

    const newUser = await this.repository.create({
      name,
      email,
      password_hash: await hash(password_hash, 8)
    })

    //if (newUser) await createCustomer(newUser.email)

    return newUser
  }

  public getById = async (id: string): Promise<object | null> => {
    return await this.repository.findOne({ id })
  }

  public getByEmail = async (email: string): Promise<object | null> => {
    return await this.repository.findOne({ email })
  }

  public getMany = async (where = {}): Promise<object[]> => {
    const result = await this.repository.read(where)

    return result
  }

  public edit = async (id: string, data: UpdateUserDto): Promise<object> => {
    if (Object.keys(data).length === 0)  throw new Error('No data sent')

    const userExists = await this.repository.findOne({ id })

    if (!userExists) throw new Error('User not found')

    if ( 'password' in data ) {
      data.password_hash = await hash(String(data.password), 8)
      delete data.password
    }

    const result = await this.repository.update({ id }, data)

    return result
  }

  public deleteUser = async (id: string): Promise<boolean> => {
    const userExists = await this.repository.findOne({ id })

    if (!userExists) throw new Error('User not found')

    const result = await this.repository.delete({ id })

    return !!result
  }
}

export { UserService }
