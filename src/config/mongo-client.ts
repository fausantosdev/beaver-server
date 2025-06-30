import mongoose from 'mongoose'

mongoose.connection.on('connected', () => {
  console.log('~ mongodb connected')
})

mongoose.connection.on('error', (err) => {
  console.error('x mongodb connection error:', err)
})

mongoose.connection.on('disconnected', () => {
  console.log('~ mongodb disconnected')
})

export { mongoose }

// OBS: Esse arquivo importa e configura o mongoose com eventos de log. Ele não se conecta automaticamente, isso fica no helper.
