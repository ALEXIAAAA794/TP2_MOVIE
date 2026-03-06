import type { Screening } from "../Domaine/Screening.js"

export function isEveningScreening(screening: Screening): boolean {
  const hour = new Date(screening.startTime).getHours()
  return hour >= 18
}