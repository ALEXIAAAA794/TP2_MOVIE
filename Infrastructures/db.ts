import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

const pool = new Pool({
  host: "localhost",
  port: 5434,
  user: "postgres",
  password: "postgres",
  database: "db"
})

export const db = drizzle(pool)

