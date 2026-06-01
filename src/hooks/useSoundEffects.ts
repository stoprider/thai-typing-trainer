import { useCallback, useEffect, useRef } from 'react'
import { SoundEngine, type SoundCue } from '../services/audio/soundEngine'
import type { SoundSettings } from '../types'

export function useSoundEffects(settings: SoundSettings) {
  const engineRef = useRef<SoundEngine>(new SoundEngine())

  useEffect(() => {
    if (!settings.enabled) {
      return
    }

    void engineRef.current.unlock()
  }, [settings.enabled])

  const playSound = useCallback(
    (cue: SoundCue) => {
      if (!settings.enabled) {
        return
      }

      engineRef.current.play(cue, settings.volume)
    },
    [settings.enabled, settings.volume],
  )

  const unlockAudio = useCallback(() => {
    void engineRef.current.unlock()
  }, [])

  return {
    playSound,
    unlockAudio,
  }
}
