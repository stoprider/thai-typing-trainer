import type { TrainingResult } from '../../types'

export interface TrainingResultRepository {
  list(): Promise<TrainingResult[]>
  save(result: TrainingResult): Promise<void>
  clear(): Promise<void>
}
