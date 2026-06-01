import type { Language, Lesson } from '../../types'

export const lessons: Lesson[] = [
  {
    id: 'th-home-row',
    language: 'th',
    level: 'home-row',
    title: 'Thai Home Row',
    description: 'ฝึกแถวกลางด้วยชุดคำสั้นที่ช่วยคงจังหวะและวางนิ้วให้แม่นยำ',
    focusKeys: ['ฟ', 'ห', 'ก', 'ด', 'เ', '้', '่', 'า', 'ส'],
    content: 'ฟหกด เก่า เก้า สาด ฟาด หาด ฟาก ด่า',
    targetWpm: 18,
  },
  {
    id: 'th-top-row',
    language: 'th',
    level: 'top-row',
    title: 'Thai Top Row',
    description: 'ไล่นิ้วแถวบนและฝึกสลับกลับมายังตำแหน่งหลักอย่างนุ่มนวล',
    focusKeys: ['ไ', 'ำ', 'พ', 'ะ', 'ั', 'ี', 'ร', 'น', 'ย'],
    content: 'นี พี ระยะ พะนะ นารี พิมพ์ ยืน',
    targetWpm: 20,
  },
  {
    id: 'th-words',
    language: 'th',
    level: 'words',
    title: 'Thai Words',
    description: 'ฝึกคำไทยที่ใช้จริงเพื่อเพิ่มความต่อเนื่องและความมั่นใจ',
    focusKeys: ['ก', 'า', 'ด', 'เ', 'น', 'ร'],
    content: 'งาน เดิน การ งานดี การเดิน อ่านงาน',
    targetWpm: 24,
  },
  {
    id: 'en-home-row',
    language: 'en',
    level: 'home-row',
    title: 'English Home Row',
    description: 'Anchor your fingers on the home row and keep a steady rhythm.',
    focusKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
    content: 'asdf jkl; sad lad flask ask dads',
    targetWpm: 25,
  },
  {
    id: 'en-bottom-row',
    language: 'en',
    level: 'bottom-row',
    title: 'English Bottom Row',
    description: 'Stretch downward without losing your home-row posture.',
    focusKeys: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    content: 'zxcv bnm zinc cabin vivid maze',
    targetWpm: 28,
  },
  {
    id: 'en-sentences',
    language: 'en',
    level: 'sentences',
    title: 'English Sentences',
    description: 'Practice full-flow typing with realistic sentence rhythm.',
    focusKeys: ['t', 'h', 'e', 'o', 'i', 'n'],
    content: 'the team can type with focus and clean motion',
    targetWpm: 32,
  },
]

export function getLessonsByLanguage(language: Language): Lesson[] {
  return lessons.filter((lesson) => lesson.language === language)
}

export function buildPersonalizedLesson(
  language: Language,
  weakKeys: string[],
): Lesson | null {
  if (weakKeys.length === 0) {
    return null
  }

  const content = weakKeys
    .slice(0, 6)
    .map((key, index) => `${key}${key} ${key}${index % 2 === 0 ? ' ' : key}`)
    .join(' ')

  return {
    id: `${language}-personalized`,
    language,
    level: 'personalized',
    title: language === 'th' ? 'บทเรียนเฉพาะบุคคล' : 'Personalized Practice',
    description:
      language === 'th'
        ? 'สร้างจากตัวอักษรที่คุณพลาดบ่อยที่สุด เพื่อเร่งแก้จุดอ่อนเฉพาะตัว'
        : 'Built from the keys you miss most often.',
    focusKeys: weakKeys.slice(0, 6),
    content,
    targetWpm: language === 'th' ? 22 : 30,
  }
}
