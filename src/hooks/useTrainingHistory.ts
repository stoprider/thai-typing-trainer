import { useEffect, useState } from 'react'
import type { TrainingResult } from '../types'
import type { TrainingResultRepository } from '../services/training/trainingResultRepository'

export function useTrainingHistory(repository: TrainingResultRepository) {
  const [results, setResults] = useState<TrainingResult[]>([])
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    let isMounted = true

    repository.list().then((items) => {
      if (!isMounted) {
        return
      }

      setResults(items)
      setIsReady(true)
    })

    return () => {
      isMounted = false
    }
  }, [repository])

  async function addResult(result: TrainingResult) {
    await repository.save(result)
    const nextResults = await repository.list()
    setResults(nextResults)
  }

  async function clearResults() {
    await repository.clear()
    setResults([])
  }

  return {
    results,
    isReady,
    addResult,
    clearResults,
  }
}
