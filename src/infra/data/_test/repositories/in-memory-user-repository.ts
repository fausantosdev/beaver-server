import { randomUUID } from 'node:crypto'

import { Repository } from '@domain/interfaces/repository'
import { CreateUserDto,UserDto } from '@shared/dtos/user-dtos'

class InMemoryUserRepository implements Repository {
  private users: UserDto[] = [
    {
      id: 'some-id',
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password_hash: 'some-password',
      role: 'user',
      password_reset_token: null,
      password_reset_expires: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    }
  ]

  public create = async ({ name, email, password_hash }: CreateUserDto): Promise<UserDto> => {
    const user = {
      id: randomUUID(),
      name,
      email,
      role: 'user',
      password_hash,
      password_reset_token: null,
      password_reset_expires: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    } as UserDto

    this.users.push(user)

    return user
  }

  public read = async ({ email }: { email: string }): Promise<UserDto[]> => {
    const users = this.users.find((user: UserDto) => user.email === email)
    return users ? [users] : []
  }

  public findOne = async ({ id, email }: { id: string, email: string }): Promise<UserDto | null> => {
    const user = this.users.find((user: UserDto) => user.email === email || user.id === id) as UserDto

    return user
  }

  public update = async ({ id, email }: { id?: string, email?: string }, data: object): Promise<UserDto | null> => {
    const userIndex = this.users.findIndex((user: UserDto) => id ? user.id === id : user.email === email)

    this.users[userIndex] = { ...this.users[userIndex], ...data }

    return this.users[userIndex]
  }

  public delete = async ({ id }: { id: string }): Promise<UserDto | null> => {
    const userIndex = this.users.findIndex((user: UserDto) => user.id === id)
    const deletedUser = this.users[userIndex]

    this.users = this.users.filter((user: UserDto) => user.id !== id)

    return deletedUser
  }
}

export { InMemoryUserRepository }
