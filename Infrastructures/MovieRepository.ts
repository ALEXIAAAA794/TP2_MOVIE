import { db } from "./db.js"
import { movies } from "./schema.js"
import { asc } from "drizzle-orm"
import { eq } from 'drizzle-orm'

export class MovieRepository {
  async list() {
    return db.select().from(movies).orderBy(asc(movies.id))
  }

  async findById(id: number) {
    const result = await db.select().from(movies).where(eq(movies.id, id))
    return result[0] ?? null
  }

  async create(data: typeof movies.$inferInsert) {
    const result = await db.insert(movies).values(data).returning()
    return result[0]
  }
}