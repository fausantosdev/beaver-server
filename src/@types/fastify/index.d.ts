import 'fastify'

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      id: string
      email: string
      role: string
    },
  }
}

/*
 * Declaration merging
 * 
 * Font: https://g.co/gemini/share/e19ed8d1aa4a
 */
