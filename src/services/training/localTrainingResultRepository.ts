import { loadFromStorage, saveToStorage } from '../storage/localStorage'
import type { TrainingResultRepository } from './trainingResultRepository'
import type { TrainingResult } from '../../types'

const STORAGE_KEY = 'typeflow.training-results'

export class LocalTrainingResultRepository implements TrainingResultRepository {
  async list(): Promise<TrainingResult[]> {
    return loadFromStorage<TrainingResult[]>(STORAGE_KEY, [])
  }

  async save(result: TrainingResult): Promise<void> {
    const current = await this.list()
    saveToStorage(STORAGE_KEY, [result, ...current].slice(0, 100))
  }

  async clear(): Promise<void> {
    saveToStorage(STORAGE_KEY, [])
  }
}
