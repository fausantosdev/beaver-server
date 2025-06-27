import { JwtService } from '@infra/services/jwt-service'
import { NotAuthorized } from '@shared/errors/not-authorized'
import { Server as HTTPServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'

class SocketServer {
  private io: SocketIOServer
  private jwt = new JwtService()

  constructor(server: HTTPServer) {
    this.io = new SocketIOServer(server, {
      cors: { origin: '*', methods: ['GET', 'POST'] }
    })

    this.setupMiddlewares()
    this.setupConnection()
  }

  private setupMiddlewares() {
    this.io.use((socket, next) => {
      const { token } = socket.handshake.query as { token?: string }

      if (!token) return next(new NotAuthorized('Unauthorized access'))

      try {
        const { status, data } = this.jwt.decodeToken(token)
        if (!status) throw new NotAuthorized('Unauthorized access')

        socket.data.user = { id: data.id, email: data.email }
        next()
      } catch {
        return next(new NotAuthorized('Unauthorized access'))
      }
    })
  }

  private setupConnection() {
    this.io.on('connection', (socket) => {
      const { email } = socket.data.user
      console.log(`~ user ${email} is connected`)

      socket.on('disconnect', () => {
        console.log(`~ user ${email} has been disconnected`)
      })
    })
  }

  public getInstance() {
    return this.io
  }
}

export { SocketServer }
