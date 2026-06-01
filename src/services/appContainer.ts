import { LocalTrainingResultRepository } from './training/localTrainingResultRepository'
import type { TrainingResultRepository } from './training/trainingResultRepository'

export interface AppServices {
  trainingResults: TrainingResultRepository
}

export const appServices: AppServices = {
  trainingResults: new LocalTrainingResultRepository(),
}
