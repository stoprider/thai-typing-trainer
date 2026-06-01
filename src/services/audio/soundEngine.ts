export type SoundCue = 'correct' | 'error' | 'complete'

interface ToneDefinition {
  frequency: number
  duration: number
  type: OscillatorType
  gain: number
}

const SOUND_MAP: Record<SoundCue, ToneDefinition | ToneDefinition[]> = {
  correct: {
    frequency: 660,
    duration: 0.06,
    type: 'triangle',
    gain: 0.07,
  },
  error: {
    frequency: 220,
    duration: 0.12,
    type: 'sawtooth',
    gain: 0.09,
  },
  complete: [
    {
      frequency: 523.25,
      duration: 0.08,
      type: 'sine',
      gain: 0.06,
    },
    {
      frequency: 659.25,
      duration: 0.1,
      type: 'sine',
      gain: 0.06,
    },
  ],
}

export class SoundEngine {
  private context: AudioContext | null = null

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') {
      return null
    }

    if (!window.AudioContext) {
      return null
    }

    if (!this.context) {
      this.context = new window.AudioContext()
    }

    return this.context
  }

  async unlock(): Promise<void> {
    const context = this.getContext()
    if (!context) {
      return
    }

    if (context.state === 'suspended') {
      await context.resume()
    }
  }

  play(cue: SoundCue, volume: number): void {
    const context = this.getContext()
    if (!context) {
      return
    }

    const tones = Array.isArray(SOUND_MAP[cue]) ? SOUND_MAP[cue] : [SOUND_MAP[cue]]
    let offset = 0

    tones.forEach((tone) => {
      const oscillator = context.createOscillator()
      const gainNode = context.createGain()
      const startAt = context.currentTime + offset
      const endAt = startAt + tone.duration

      oscillator.type = tone.type
      oscillator.frequency.setValueAtTime(tone.frequency, startAt)

      gainNode.gain.setValueAtTime(0.0001, startAt)
      gainNode.gain.exponentialRampToValueAtTime(
        Math.max(tone.gain * volume, 0.0001),
        startAt + 0.01,
      )
      gainNode.gain.exponentialRampToValueAtTime(0.0001, endAt)

      oscillator.connect(gainNode)
      gainNode.connect(context.destination)
      oscillator.start(startAt)
      oscillator.stop(endAt)

      offset += tone.duration * 0.8
    })
  }
}
