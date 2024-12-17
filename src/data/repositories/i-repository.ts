export interface IRepository {
  create(data: object): Promise<object>
  read(where: object): Promise<object[]>
  findOne(where: object): Promise<object | null>
  update(where: object, data: object): Promise<object>
  delete(where: object): Promise<object | null>
}
