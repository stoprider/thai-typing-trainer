import type { DashboardStats, Language, TrainingResult } from '../../types'

function round(value: number): number {
  return Number(value.toFixed(1))
}

export function getWeakKeysByLanguage(
  results: TrainingResult[],
  language: Language,
): string[] {
  const weakMap = new Map<string, number>()

  results
    .filter((result) => result.language === language)
    .forEach((result) => {
      Object.entries(result.weakKeyMap).forEach(([key, count]) => {
        weakMap.set(key, (weakMap.get(key) ?? 0) + count)
      })
    })

  return [...weakMap.entries()]
    .sort((left, right) => right[1] - left[1])
    .slice(0, 6)
    .map(([key]) => (key === 'space' ? ' ' : key))
}

export function getDashboardStats(
  results: TrainingResult[],
  language: Language,
): DashboardStats {
  const scoped = results
    .filter((result) => result.language === language)
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt))

  if (scoped.length === 0) {
    return {
      totalSessions: 0,
      averageAccuracy: 0,
      averageWpm: 0,
      bestWpm: 0,
      totalPracticeMinutes: 0,
      recentResults: [],
      weakKeys: [],
    }
  }

  const totals = scoped.reduce(
    (accumulator, result) => {
      accumulator.accuracy += result.accuracy
      accumulator.wpm += result.wpm
      accumulator.bestWpm = Math.max(accumulator.bestWpm, result.wpm)
      accumulator.durationSeconds += result.durationSeconds

      Object.entries(result.weakKeyMap).forEach(([key, count]) => {
        accumulator.weakMap.set(key, (accumulator.weakMap.get(key) ?? 0) + count)
      })

      return accumulator
    },
    {
      accuracy: 0,
      wpm: 0,
      bestWpm: 0,
      durationSeconds: 0,
      weakMap: new Map<string, number>(),
    },
  )

  return {
    totalSessions: scoped.length,
    averageAccuracy: round(totals.accuracy / scoped.length),
    averageWpm: round(totals.wpm / scoped.length),
    bestWpm: round(totals.bestWpm),
    totalPracticeMinutes: round(totals.durationSeconds / 60),
    recentResults: scoped.slice(0, 5),
    weakKeys: [...totals.weakMap.entries()]
      .sort((left, right) => right[1] - left[1])
      .slice(0, 5)
      .map(([key, count]) => ({
        key: key === 'space' ? 'Space' : key,
        count,
      })),
  }
}
