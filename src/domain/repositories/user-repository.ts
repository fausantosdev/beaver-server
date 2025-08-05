import { User } from '@domain/entities/user'

export interface UserRepository {
  create(data: object): Promise<User>
  read(where: object): Promise<User[]>
  findOne(where: object): Promise<User | null>
  update(where: object, data: object): Promise<User | null>
  delete(where: object): Promise<User | null>
}
