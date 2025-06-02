class Task {
  public readonly id?: string
  public parent_id?: string | null
  public user_id: string
  public description: string
  public progress?: number | null
  public readonly created_at?: Date
  public readonly updated_at?: Date

  constructor({ parent_id, user_id, description, progress = 0 }: {
    parent_id?: string | null
    user_id: string
    description: string
    progress?: number
  }) {
    this.parent_id = parent_id || null
    this.user_id = user_id
    this.description = description
    this.progress = progress
  }
}

export { Task }
