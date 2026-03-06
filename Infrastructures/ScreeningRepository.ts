import { db } from "./db.js"
import { screenings, rooms } from "./schema.js"
import { eq, asc } from "drizzle-orm"

export class ScreeningRepository {
  async listByMovieId(movieId: number) {
    const rows = await db
      .select({
        id: screenings.id,
        movieId: screenings.movieId,
        startTime: screenings.startTime,
        price: screenings.price,
        roomId: rooms.id,
        roomName: rooms.name,
        roomCapacity: rooms.capacity
      })
      .from(screenings)
      .innerJoin(rooms, eq(screenings.roomId, rooms.id))
      .where(eq(screenings.movieId, movieId))
      .orderBy(asc(screenings.startTime))

    return rows.map((row) => ({
      id: row.id,
      movieId: row.movieId,
      startTime: row.startTime,
      price: Number(row.price),
      room: {
        id: row.roomId,
        name: row.roomName,
        capacity: row.roomCapacity
      }
    }))
  }
}