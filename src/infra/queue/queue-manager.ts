import { QueueManager as IQueueManager } from '@app/interfaces/queue/queue-manager'
import { env } from '@config/env'
import { jobs } from '@infra/factories/jobs'
import Queue, { Job, Queue as BullQueue } from 'bull'

type QueueItem = {
  item: BullQueue
  handle: (job: Job) => Promise<void>
}

class QueueManager implements IQueueManager {
  private queues: Record<string, QueueItem> = {}

  constructor() {
    this.init()
  }

  /**
   * Inicializa todas as filas
   */
  public init() {
    jobs.forEach(({ key, handle }) => {
      const item = new Queue(key, {
        redis: env.REDIS_CONECTION_STRING
      })

      this.queues[key] = {
        item,
        handle,
      }
    })
  }

  /**
   * Adiciona um job na fila
   */
  public async add(queueKey: string, data: object) {
    const queue = this.queues[queueKey]

    if (!queue) {
      throw new Error(`Queue ${queueKey} not found.`)
    }

    return queue.item.add(data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    })
  }

  /**
   * Processa as filas
   */
  public processQueues() {
    jobs.forEach(({ key }) => {
      const { item, handle } = this.queues[key]

      item.process(async (job: Job) => {
        try {
          await handle(job)
          this.handleSuccess(key, job)
        } catch (err: any) {
          this.handleFailure(key, job, err)
          throw err
        }
      })

      item.on('failed', (job, err) => {
        this.handleFailure(key, job, err)
      })

      item.on('completed', (job) => {
        this.handleSuccess(key, job)
      })
    })
  }

  /**
   * Quando falha
   */
  public handleFailure(queueKey: string, job: Job, error: Error) {
    console.error(`x [${queueKey}] / Job ${job.id} failed.`, error)
  }

  /**
   * Quando conclui
   */
  public handleSuccess(queueKey: string, job: Job) {
    console.log(`~ [${queueKey}] / Job ${job.id} processed successfully.`)
  }
}

export { QueueManager }
