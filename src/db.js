import { createPool } from 'mysql2/promise'
import { configDb } from './config.js'

export const pool = createPool({
  host: configDb.host,
  user: configDb.user,
  password: configDb.password,
  port: configDb.port,
  database: configDb.database,
})
