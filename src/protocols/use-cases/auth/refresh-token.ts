export interface RefreshToken {
  execute(token: string): Promise<{ jwt: string }>
}
