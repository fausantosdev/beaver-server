import { User } from '@entities/user'
import { CreateUserDto } from '@shared/dtos/user-dtos'

export interface IUserRepository {
  create(data: CreateUserDto): Promise<User>
  read(where: object): Promise<User[]>
  findOne(where: object): Promise<User | null>
  update(where: object, data: object): Promise<User | null>
  delete(where: object): Promise<User | null>
}
