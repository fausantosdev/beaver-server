export interface ForgotPassword {
  execute(email: string): Promise<{ status: boolean, message: string }>
}
