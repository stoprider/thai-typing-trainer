export type Language = 'th' | 'en'

export type LessonLevel =
  | 'home-row'
  | 'top-row'
  | 'bottom-row'
  | 'words'
  | 'sentences'
  | 'personalized'

export interface Lesson {
  id: string
  language: Language
  level: LessonLevel
  title: string
  description: string
  focusKeys: string[]
  content: string
  targetWpm: number
}

export interface TrainingResult {
  id: string
  lessonId: string
  lessonTitle: string
  language: Language
  accuracy: number
  wpm: number
  errors: number
  durationSeconds: number
  typedCharacters: number
  weakKeyMap: Record<string, number>
  createdAt: string
}

export interface TypingSession {
  lessonId: string
  content: string
  status: 'idle' | 'active' | 'completed'
  currentIndex: number
  typedText: string
  pressedKey: string | null
  startedAt: number | null
  endedAt: number | null
  keystrokes: number
  correctKeystrokes: number
  errorCount: number
  weakKeyMap: Record<string, number>
}

export interface SessionMetrics {
  accuracy: number
  wpm: number
  durationSeconds: number
}

export interface KeyboardKey {
  id: string
  finger:
    | 'left-pinky'
    | 'left-ring'
    | 'left-middle'
    | 'left-index'
    | 'left-thumb'
    | 'right-thumb'
    | 'right-index'
    | 'right-middle'
    | 'right-ring'
    | 'right-pinky'
  primary: string
  secondary?: string
}

export interface DashboardStats {
  totalSessions: number
  averageAccuracy: number
  averageWpm: number
  bestWpm: number
  totalPracticeMinutes: number
  recentResults: TrainingResult[]
  weakKeys: Array<{ key: string; count: number }>
}

export interface SoundSettings {
  enabled: boolean
  volume: number
}
