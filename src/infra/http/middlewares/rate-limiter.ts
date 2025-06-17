import { redis } from '@infra/data/redis/redis-helper'
import { AppError } from '@shared/errors/app-error'
import { FastifyRequest } from 'fastify'

class RateLimiter {
  public static handle =
    (resource: string, limit = 5) =>
    async (request: FastifyRequest): Promise<void> =>
  {
    const ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress

    const url = resource || request.originalUrl
    const key = `rate-limit-${url}-${ip}`

    const requestCount = Number(await redis.get(key) || 0) + 1

    await redis.set(key, String(requestCount), 30)

    if (requestCount > limit) throw new AppError('Too Many Requests Detected. Please wait for 1 minute before trying again.')
  }
}

export { RateLimiter }
