import 'dotenv/config'

import { app } from './app'

const port = Number(process.env.PORT) || 4004

app.listen({
  port
}).then(() => {
  console.log(`~ server running on port ${port}`)
})
