import { useEffect, useMemo, useRef, useState } from 'react'
import { DashboardPanel } from './components/DashboardPanel'
import { FingerGuide } from './components/FingerGuide'
import { KeyboardVisualizer } from './components/KeyboardVisualizer'
import { LanguageSwitcher } from './components/LanguageSwitcher'
import { LessonList } from './components/LessonList'
import { SectionCard } from './components/SectionCard'
import { SoundControls } from './components/SoundControls'
import { TypingPanel } from './components/TypingPanel'
import { getLessonsByLanguage, buildPersonalizedLesson } from './features/lesson/lessonData'
import { getDashboardStats, getWeakKeysByLanguage } from './features/statistics/statisticsSelectors'
import {
  buildTrainingResult,
  calculateSessionMetrics,
  createTypingSession,
  processKeyStroke,
} from './features/typing/typingEngine'
import { usePersistentState } from './hooks/usePersistentState'
import { useSoundEffects } from './hooks/useSoundEffects'
import { useTrainingHistory } from './hooks/useTrainingHistory'
import { appServices } from './services/appContainer'
import type { Language, Lesson, SoundSettings, TypingSession } from './types'

function pickDefaultLesson(language: Language): string {
  const firstLesson = getLessonsByLanguage(language)[0]
  return firstLesson?.id ?? ''
}

function resolveSelectedLesson(lessons: Lesson[], lessonId: string): Lesson {
  return lessons.find((lesson) => lesson.id === lessonId) ?? lessons[0]
}

function App() {
  const [language, setLanguage] = usePersistentState<Language>('typeflow.language', 'th')
  const [selectedLessonId, setSelectedLessonId] = usePersistentState<string>(
    'typeflow.lesson-id',
    pickDefaultLesson('th'),
  )
  const [soundSettings, setSoundSettings] = usePersistentState<SoundSettings>(
    'typeflow.sound-settings',
    { enabled: true, volume: 0.35 },
  )
  const [session, setSession] = useState<TypingSession | null>(null)
  const completionRef = useRef<string | null>(null)
  const { results, isReady, addResult, clearResults } = useTrainingHistory(
    appServices.trainingResults,
  )
  const { playSound, unlockAudio } = useSoundEffects(soundSettings)

  const weakKeys = useMemo(
    () => getWeakKeysByLanguage(results, language),
    [language, results],
  )
  const personalizedLesson = useMemo(
    () => buildPersonalizedLesson(language, weakKeys),
    [language, weakKeys],
  )
  const availableLessons = useMemo(() => {
    const baseLessons = getLessonsByLanguage(language)
    return personalizedLesson ? [...baseLessons, personalizedLesson] : baseLessons
  }, [language, personalizedLesson])
  const selectedLesson = useMemo(
    () => resolveSelectedLesson(availableLessons, selectedLessonId),
    [availableLessons, selectedLessonId],
  )
  const dashboardStats = useMemo(
    () => getDashboardStats(results, language),
    [language, results],
  )

  useEffect(() => {
    if (!availableLessons.some((lesson) => lesson.id === selectedLessonId)) {
      setSelectedLessonId(availableLessons[0]?.id ?? '')
    }
  }, [availableLessons, selectedLessonId, setSelectedLessonId])

  const activeSession =
    session && session.lessonId === selectedLesson.id
      ? session
      : createTypingSession(selectedLesson)

  useEffect(() => {
    if (activeSession.status !== 'completed') {
      return
    }

    const completionKey = `${activeSession.lessonId}-${activeSession.endedAt}`
    if (completionRef.current === completionKey) {
      return
    }

    completionRef.current = completionKey
    playSound('complete')
    void addResult(buildTrainingResult(selectedLesson, activeSession))
  }, [activeSession, addResult, playSound, selectedLesson])

  return (
    <main className="min-h-screen bg-mist bg-[size:32px_32px] bg-grid text-ink">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[32px] bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.9),_rgba(255,236,205,0.78)_45%,_rgba(207,250,254,0.84)_100%)] p-8 shadow-soft md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="font-mono text-sm uppercase tracking-[0.32em] text-ember">
                TypeFlow
              </p>
              <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-ink md:text-6xl">
                Touch typing for Thai and English, with live feedback and adaptive practice.
              </h1>
              <p className="mt-4 max-w-2xl text-base text-slate-700 md:text-lg">
                ฝึกวางนิ้วให้ถูก ตรวจจับการพิมพ์ผิดแบบ real-time และเก็บสถิติเพื่อสร้างบทเรียนเฉพาะบุคคลในอนาคต
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-[28px] border border-white/60 bg-white/70 p-6 backdrop-blur">
                <LanguageSwitcher
                  value={language}
                  onChange={(nextLanguage) => {
                    setLanguage(nextLanguage)
                    setSelectedLessonId(pickDefaultLesson(nextLanguage))
                  }}
                />
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-slate-950 p-4 text-white">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-300">Lesson</p>
                    <p className="mt-2 text-lg font-semibold">{selectedLesson.title}</p>
                  </div>
                  <div className="rounded-2xl bg-amber-100 p-4 text-amber-950">
                    <p className="text-xs uppercase tracking-[0.22em] text-amber-700">Target</p>
                    <p className="mt-2 font-mono text-2xl font-semibold">
                      {selectedLesson.targetWpm} WPM
                    </p>
                  </div>
                  <div className="rounded-2xl bg-cyan-100 p-4 text-cyan-950">
                    <p className="text-xs uppercase tracking-[0.22em] text-cyan-700">Live</p>
                    <p className="mt-2 font-mono text-2xl font-semibold">
                      {calculateSessionMetrics(activeSession).wpm} WPM
                    </p>
                  </div>
                </div>
              </div>
              <SoundControls value={soundSettings} onChange={setSoundSettings} />
            </div>
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-[0.75fr_1.25fr]">
          <SectionCard
            title="Lesson Path"
            subtitle="Structured drills for home row, row transitions, words, and personalized recovery."
          >
            <LessonList
              lessons={availableLessons}
              selectedLessonId={selectedLesson.id}
              onSelect={setSelectedLessonId}
            />
          </SectionCard>

          <SectionCard
            title="Typing Studio"
            subtitle="Live WPM, live accuracy, immediate error tracking, and restart-friendly practice."
            aside={
              <span className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white">
                {language === 'th' ? 'Thai Mode' : 'English Mode'}
              </span>
            }
          >
            <TypingPanel
              lesson={selectedLesson}
              session={activeSession}
              onKeyPress={(key) => {
                unlockAudio()
                const currentSession = session ?? activeSession
                const nextSession = processKeyStroke(currentSession, key)
                setSession(nextSession)
                playSound(
                  nextSession.currentIndex > currentSession.currentIndex ? 'correct' : 'error',
                )
              }}
              onReset={() => {
                completionRef.current = null
                setSession(createTypingSession(selectedLesson))
              }}
              onFocusInput={unlockAudio}
            />
          </SectionCard>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1fr_0.9fr]">
          <SectionCard
            title="Keyboard Visualization"
            subtitle="Highlights the expected key and the last key pressed to reinforce finger memory."
          >
            <KeyboardVisualizer
              language={language}
              expectedChar={selectedLesson.content[activeSession.currentIndex] ?? null}
              pressedKey={activeSession.pressedKey}
            />
          </SectionCard>

          <SectionCard
            title="Finger Placement"
            subtitle="Use these anchors to keep hand posture consistent and reduce reaching errors."
          >
            <FingerGuide />
          </SectionCard>
        </div>

        <SectionCard
          title="Statistics Dashboard"
          subtitle="Persisted locally today, ready to swap into an API-backed repository later."
        >
          {isReady ? (
            <DashboardPanel stats={dashboardStats} onClear={() => void clearResults()} />
          ) : (
            <p className="text-sm text-slate-500">Loading saved history...</p>
          )}
        </SectionCard>
      </div>
    </main>
  )
}

export default App
