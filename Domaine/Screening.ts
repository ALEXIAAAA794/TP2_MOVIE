export type Screening = {
  id: number
  movieId: number
  startTime: Date
  price: number
  room: {
    id: number
    name: string
    capacity: number
  }
}