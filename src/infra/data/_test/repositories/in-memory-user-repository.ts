import { randomUUID } from 'node:crypto'

import { User } from '@domain/entities/user'
import { IUserRepository } from '@domain/repositories/user-repository'
import { CreateUserDto } from '@shared/dtos/user-dtos'

class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [
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

  public create = async ({ name, email, password_hash }: CreateUserDto): Promise<User> => {
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
    } as User

    this.users.push(user)

    return user
  }

  public read = async ({ email }: { email: string }): Promise<User[]> => {
    const users = this.users.find((user: User) => user.email === email)
    return users ? [users] : []
  }

  public findOne = async ({ id, email }: { id: string, email: string }): Promise<User | null> => {
    const user = this.users.find((user: User) => user.email === email || user.id === id) as User

    return user
  }

  public update = async ({ id, email }: { id?: string, email?: string }, data: object): Promise<User | null> => {
    const userIndex = this.users.findIndex((user: User) => id ? user.id === id : user.email === email)

    this.users[userIndex] = { ...this.users[userIndex], ...data }

    return this.users[userIndex]
  }

  public delete = async ({ id }: { id: string }): Promise<User | null> => {
    const userIndex = this.users.findIndex((user: User) => user.id === id)
    const deletedUser = this.users[userIndex]

    this.users = this.users.filter((user: User) => user.id !== id)

    return deletedUser
  }
}

export { InMemoryUserRepository }
