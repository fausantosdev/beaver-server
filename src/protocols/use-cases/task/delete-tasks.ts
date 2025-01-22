export interface DeleteTasks{
  execute(where: object): Promise<object | null>
}
