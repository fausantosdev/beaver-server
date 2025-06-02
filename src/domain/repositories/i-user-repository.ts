import { User } from '@entities/user'

export interface IUserRepository {
  create(data: User): Promise<User>
  read(where: object): Promise<User[]>
  findOne(where: object): Promise<User | null>
  update(where: object, data: object): Promise<User | null>
  delete(where: object): Promise<User | null>
}
