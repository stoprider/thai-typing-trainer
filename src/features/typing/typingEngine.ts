import type { Lesson, SessionMetrics, TrainingResult, TypingSession } from '../../types'

export function createTypingSession(lesson: Lesson): TypingSession {
  return {
    lessonId: lesson.id,
    content: lesson.content,
    status: 'idle',
    currentIndex: 0,
    typedText: '',
    pressedKey: null,
    startedAt: null,
    endedAt: null,
    keystrokes: 0,
    correctKeystrokes: 0,
    errorCount: 0,
    weakKeyMap: {},
  }
}

export function calculateSessionMetrics(session: TypingSession): SessionMetrics {
  const startedAt = session.startedAt ?? Date.now()
  const endedAt = session.endedAt ?? Date.now()
  const durationMs = Math.max(endedAt - startedAt, 1000)
  const durationSeconds = Math.round(durationMs / 1000)
  const minutes = durationMs / 60000
  const accuracy =
    session.keystrokes === 0
      ? 100
      : Number(((session.correctKeystrokes / session.keystrokes) * 100).toFixed(1))
  const wpm =
    session.correctKeystrokes === 0
      ? 0
      : Number(((session.correctKeystrokes / 5 / minutes)).toFixed(1))

  return {
    accuracy,
    wpm,
    durationSeconds,
  }
}

export function processKeyStroke(
  session: TypingSession,
  pressedKey: string,
): TypingSession {
  if (pressedKey.length !== 1 && pressedKey !== ' ') {
    return session
  }

  const expectedChar = session.content[session.currentIndex]
  const now = Date.now()
  const nextBase: TypingSession = {
    ...session,
    status: 'active',
    startedAt: session.startedAt ?? now,
    pressedKey,
    keystrokes: session.keystrokes + 1,
  }

  if (pressedKey === expectedChar) {
    const nextIndex = session.currentIndex + 1
    const completed = nextIndex >= session.content.length

    return {
      ...nextBase,
      currentIndex: nextIndex,
      typedText: `${session.typedText}${pressedKey}`,
      correctKeystrokes: session.correctKeystrokes + 1,
      status: completed ? 'completed' : 'active',
      endedAt: completed ? now : null,
    }
  }

  const missKey = expectedChar.trim() === '' ? 'space' : expectedChar
  const count = nextBase.weakKeyMap[missKey] ?? 0

  return {
    ...nextBase,
    errorCount: session.errorCount + 1,
    weakKeyMap: {
      ...session.weakKeyMap,
      [missKey]: count + 1,
    },
  }
}

export function buildTrainingResult(
  lesson: Lesson,
  session: TypingSession,
): TrainingResult {
  const metrics = calculateSessionMetrics(session)

  return {
    id: `${lesson.id}-${session.endedAt ?? Date.now()}`,
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    language: lesson.language,
    accuracy: metrics.accuracy,
    wpm: metrics.wpm,
    errors: session.errorCount,
    durationSeconds: metrics.durationSeconds,
    typedCharacters: session.correctKeystrokes,
    weakKeyMap: session.weakKeyMap,
    createdAt: new Date(session.endedAt ?? Date.now()).toISOString(),
  }
}
