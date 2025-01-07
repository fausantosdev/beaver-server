export interface DeleteUser {
  execute(id: string): Promise<boolean>
}
