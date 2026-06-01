import type { KeyboardKey, Language } from '../../types'

type KeyboardLayout = KeyboardKey[][]

const englishLayout: KeyboardLayout = [
  [
    { id: 'en-q', primary: 'q', finger: 'left-pinky' },
    { id: 'en-w', primary: 'w', finger: 'left-ring' },
    { id: 'en-e', primary: 'e', finger: 'left-middle' },
    { id: 'en-r', primary: 'r', finger: 'left-index' },
    { id: 'en-t', primary: 't', finger: 'left-index' },
    { id: 'en-y', primary: 'y', finger: 'right-index' },
    { id: 'en-u', primary: 'u', finger: 'right-index' },
    { id: 'en-i', primary: 'i', finger: 'right-middle' },
    { id: 'en-o', primary: 'o', finger: 'right-ring' },
    { id: 'en-p', primary: 'p', finger: 'right-pinky' },
  ],
  [
    { id: 'en-a', primary: 'a', finger: 'left-pinky' },
    { id: 'en-s', primary: 's', finger: 'left-ring' },
    { id: 'en-d', primary: 'd', finger: 'left-middle' },
    { id: 'en-f', primary: 'f', finger: 'left-index' },
    { id: 'en-g', primary: 'g', finger: 'left-index' },
    { id: 'en-h', primary: 'h', finger: 'right-index' },
    { id: 'en-j', primary: 'j', finger: 'right-index' },
    { id: 'en-k', primary: 'k', finger: 'right-middle' },
    { id: 'en-l', primary: 'l', finger: 'right-ring' },
    { id: 'en-semi', primary: ';', finger: 'right-pinky' },
  ],
  [
    { id: 'en-z', primary: 'z', finger: 'left-pinky' },
    { id: 'en-x', primary: 'x', finger: 'left-ring' },
    { id: 'en-c', primary: 'c', finger: 'left-middle' },
    { id: 'en-v', primary: 'v', finger: 'left-index' },
    { id: 'en-b', primary: 'b', finger: 'left-index' },
    { id: 'en-n', primary: 'n', finger: 'right-index' },
    { id: 'en-m', primary: 'm', finger: 'right-index' },
    { id: 'en-comma', primary: ',', finger: 'right-middle' },
    { id: 'en-dot', primary: '.', finger: 'right-ring' },
    { id: 'en-slash', primary: '/', finger: 'right-pinky' },
  ],
  [{ id: 'en-space', primary: 'space', finger: 'left-thumb' }],
]

const thaiLayout: KeyboardLayout = [
  [
    { id: 'th-q', primary: 'ๆ', finger: 'left-pinky' },
    { id: 'th-w', primary: 'ไ', finger: 'left-ring' },
    { id: 'th-e', primary: 'ำ', finger: 'left-middle' },
    { id: 'th-r', primary: 'พ', finger: 'left-index' },
    { id: 'th-t', primary: 'ะ', finger: 'left-index' },
    { id: 'th-y', primary: 'ั', finger: 'right-index' },
    { id: 'th-u', primary: 'ี', finger: 'right-index' },
    { id: 'th-i', primary: 'ร', finger: 'right-middle' },
    { id: 'th-o', primary: 'น', finger: 'right-ring' },
    { id: 'th-p', primary: 'ย', finger: 'right-pinky' },
  ],
  [
    { id: 'th-a', primary: 'ฟ', finger: 'left-pinky' },
    { id: 'th-s', primary: 'ห', finger: 'left-ring' },
    { id: 'th-d', primary: 'ก', finger: 'left-middle' },
    { id: 'th-f', primary: 'ด', finger: 'left-index' },
    { id: 'th-g', primary: 'เ', finger: 'left-index' },
    { id: 'th-h', primary: '้', finger: 'right-index' },
    { id: 'th-j', primary: '่', finger: 'right-index' },
    { id: 'th-k', primary: 'า', finger: 'right-middle' },
    { id: 'th-l', primary: 'ส', finger: 'right-ring' },
    { id: 'th-semi', primary: 'ว', finger: 'right-pinky' },
  ],
  [
    { id: 'th-z', primary: 'ผ', finger: 'left-pinky' },
    { id: 'th-x', primary: 'ป', finger: 'left-ring' },
    { id: 'th-c', primary: 'แ', finger: 'left-middle' },
    { id: 'th-v', primary: 'อ', finger: 'left-index' },
    { id: 'th-b', primary: 'ิ', finger: 'left-index' },
    { id: 'th-n', primary: 'ื', finger: 'right-index' },
    { id: 'th-m', primary: 'ท', finger: 'right-index' },
    { id: 'th-comma', primary: 'ม', finger: 'right-middle' },
    { id: 'th-dot', primary: 'ใ', finger: 'right-ring' },
    { id: 'th-slash', primary: 'ฝ', finger: 'right-pinky' },
  ],
  [{ id: 'th-space', primary: 'space', finger: 'left-thumb' }],
]

export function getKeyboardLayout(language: Language): KeyboardLayout {
  return language === 'th' ? thaiLayout : englishLayout
}

export function keyMatchesCharacter(key: KeyboardKey, character: string): boolean {
  if (character === ' ') {
    return key.primary === 'space'
  }

  return [key.primary, key.secondary]
    .filter(Boolean)
    .some((value) => value?.toLowerCase() === character.toLowerCase())
}
