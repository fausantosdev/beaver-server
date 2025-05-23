class Task {
  public readonly id?: string
  public parent_id?: string | null
  public user_id?: string
  public description?: string
  public progress?: number | null
  public readonly created_at?: Date
  public readonly updated_at?: Date
}

export { Task }
