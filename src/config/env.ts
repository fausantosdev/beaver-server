import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
  APP_KEY: z.string(),
  PORT: z.coerce.number().default(4004),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  DATABASE_URL: z.string(),
  MAIL_HOST: z.string(),
  MAIL_PORT: z.coerce.number(),
  MAIL_SECURE: z.string(),
  MAIL_USER: z.string(),
  MAIL_PASS: z.string(),
  REDIS_CONECTION_STRING: z.string(),
  MONGO_URL: z.string()
  })

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('x invalid environment variables.\n', _env.error.format())
  process.exit(1)
}

export const env = _env.data
