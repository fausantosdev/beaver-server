type QueueKeys =
  'ForgotPasswordEmail' |
  'AnyQueueKey'

interface QueueManager {
  init(): void
  add(queueKey: QueueKeys, data: object): Promise<any>
  processQueues(): void
  handleFailure(queueKey: string, job: any, error: Error): void
  handleSuccess(queueKey: string, job: any): void
}

export { QueueManager }
