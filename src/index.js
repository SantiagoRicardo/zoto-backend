import express from 'express'
import cors from 'cors'

import { routers } from './routers/index.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', routers)

const PORT = 3000
app.listen(PORT, () => {
  console.log('server listen on port', PORT)
})
