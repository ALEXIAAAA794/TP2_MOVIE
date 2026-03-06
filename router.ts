import express from "express"
import { MovieRepository } from "./Infrastructures/MovieRepository.js"
import { ScreeningRepository } from "./Infrastructures/ScreeningRepository.js"
import { isEveningScreening } from "./Domaine/ScreeningService.js"

export function createRouter() {
  const router = express.Router()

  const movies = new MovieRepository()
  const screenings = new ScreeningRepository()

  router.get("/health", (req, res) => {
    res.json({ ok: true })
  })

  router.get("/movies", async (req, res) => {
    const items = await movies.list()
    res.json({ ok: true, items })
  })

  router.get("/movies/:id/screenings", async (req, res) => {
    const movieId = Number(req.params.id)
    const items = await screenings.listByMovieId(movieId)

    const enriched = items.map((item) => ({
      ...item,
      isEvening: isEveningScreening(item)
    }))

    res.json({ ok: true, items: enriched })
  })

  return router
}