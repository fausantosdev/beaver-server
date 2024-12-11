import 'dotenv/config'

import { app } from './app'

app.init(Number(process.env.PORT) || 4004)
