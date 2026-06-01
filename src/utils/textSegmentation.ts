export interface TextSegment {
  value: string
  start: number
  end: number
}

let segmenter: Intl.Segmenter | null = null

function getSegmenter(): Intl.Segmenter | null {
  if (typeof Intl === 'undefined' || typeof Intl.Segmenter === 'undefined') {
    return null
  }

  if (!segmenter) {
    segmenter = new Intl.Segmenter('th', { granularity: 'grapheme' })
  }

  return segmenter
}

export function segmentText(value: string): TextSegment[] {
  const activeSegmenter = getSegmenter()

  if (!activeSegmenter) {
    return Array.from(value).map((character, index) => ({
      value: character,
      start: index,
      end: index + character.length,
    }))
  }

  const segments: TextSegment[] = []

  for (const item of activeSegmenter.segment(value)) {
    segments.push({
      value: item.segment,
      start: item.index,
      end: item.index + item.segment.length,
    })
  }

  return segments
}
