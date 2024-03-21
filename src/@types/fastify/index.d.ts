import 'fastify'

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      id: string
      username: string
      role: string
    },
  }
}

/*
 * Declaration merging
 * 
 * Font: https://g.co/gemini/share/e19ed8d1aa4a
 */
