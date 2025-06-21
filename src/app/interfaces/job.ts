interface Job {
  /**
   * Chave única da fila
   */
  key: string

  /**
   * Função executada quando o job é processado
   */
  handle(job: any): Promise<any>
}

export { Job }
