export interface Repository {
  create(data: object): Promise<object>
  read(where: object): Promise<object[]>
  findOne(where: object): Promise<object | null>
  update(where: object, data: object): Promise<object | null>
  delete(where: object): Promise<object | null>
}
