class User {
  public readonly id?: string
  public name: string
  public email: string
  public password_hash: string
  public role?: string
  public password_reset_token?: string | null
  public password_reset_expires?: Date | null
  public readonly created_at?: Date
  public readonly updated_at?: Date

  constructor({ name, email, password_hash, role = 'user' }: {
    name: string
    email: string
    password_hash: string
    role?: string
  }) {
    this.name = name
    this.email = email
    this.password_hash = password_hash
    this.role = role
  }
}

export { User }
