# เอกสารโครงการ TypeFlow

## 1. ภาพรวม

TypeFlow เป็นระบบฝึกพิมพ์สัมผัสผ่านเว็บเบราว์เซอร์สำหรับภาษาไทยและภาษาอังกฤษ โดยมีเป้าหมายเพื่อช่วยผู้ใช้พัฒนาความเร็ว ความแม่นยำ และทักษะการวางนิ้วอย่างถูกต้อง พร้อมวางพื้นฐานสำหรับระบบบทเรียนเฉพาะบุคคลในอนาคต

เวอร์ชันปัจจุบันรองรับทั้งการทำงานแบบเว็บแอป และมีโครงสร้างสำหรับแพ็กเป็นโปรแกรม Windows ผ่าน Tauri แล้ว

## 2. เป้าหมายทางธุรกิจ

- ช่วยผู้ใช้พิมพ์ได้เร็วขึ้น
- ลดจำนวนการพิมพ์ผิด
- สร้างทักษะ touch typing ที่ถูกต้อง
- ทำให้ผู้ใช้ติดตามพัฒนาการของตัวเองได้
- รองรับการต่อยอดเป็นระบบสมาชิกและการ sync ข้อมูลในอนาคต

## 3. กลุ่มผู้ใช้งาน

- นักเรียน
- นักศึกษา
- พนักงานออฟฟิศ
- โปรแกรมเมอร์
- IT Support
- ผู้เริ่มต้นฝึกพิมพ์

## 4. Functional Requirements ที่รองรับแล้ว

- เลือกภาษา `Thai` และ `English`
- แสดงคีย์บอร์ดบนหน้าจอ
- แสดง finger mapping
- ตรวจจับคีย์ที่คาดหวังและคีย์ที่กดล่าสุด
- ตรวจจับการพิมพ์ผิดแบบ real-time
- คำนวณ `WPM`
- คำนวณ `Accuracy`
- นับ `Error Count`
- ระบบบทเรียนหลายชุด
- สร้าง personalized lesson จาก weak keys
- Dashboard สถิติผู้ใช้
- บันทึกผลการฝึกลง `localStorage`
- ระบบเสียงตอบกลับสำหรับ correct / error / complete

## 5. Non-Functional Goals

- ใช้งานได้ดีบน modern browser
- Responsive layout
- Production build เร็วและง่ายต่อ deployment
- แยกโครงสร้างให้ maintain และ scale ได้
- ลด coupling ระหว่าง UI กับ persistence layer

## 6. Technology Stack

### Frontend

- React 19
- TypeScript
- Vite
- TailwindCSS

### Supporting APIs

- Web Audio API สำหรับเสียง
- LocalStorage สำหรับ persistence

### Desktop Runtime

- Tauri 2
- Rust backend runtime
- Windows bundle targets: `NSIS`, `MSI`

### Future Backend

- Node.js
- Express
- PostgreSQL

## 7. สถาปัตยกรรมระบบ

ระบบถูกออกแบบแบบ frontend-first โดยแบ่ง responsibility ชัดเจน

### 7.1 Components Layer

ดูแล UI ที่นำกลับมาใช้ซ้ำได้ เช่น

- lesson list
- keyboard visualizer
- typing panel
- sound controls
- dashboard panel

### 7.2 Feature Layer

เก็บ business logic แยกตามโดเมน

- `lesson`
- `typing`
- `statistics`
- `keyboard`

### 7.3 Hooks Layer

จัดการ reusable behavior ที่มี state

- persistent state
- training history loading
- sound effect lifecycle

### 7.4 Services Layer

ดูแล infrastructure

- storage service
- audio engine
- repository abstraction
- app container

### 7.5 Types Layer

รวม contract ของ data model เพื่อให้ทุกชั้นใช้ schema เดียวกัน

## 8. โครงสร้างโฟลเดอร์

```text
src/
  components/
    DashboardPanel.tsx
    FingerGuide.tsx
    KeyboardVisualizer.tsx
    LanguageSwitcher.tsx
    LessonList.tsx
    SectionCard.tsx
    SoundControls.tsx
    StatPill.tsx
    TypingPanel.tsx
  features/
    keyboard/
      keyboardLayouts.ts
    lesson/
      lessonData.ts
    statistics/
      statisticsSelectors.ts
    typing/
      typingEngine.ts
  hooks/
    usePersistentState.ts
    useSoundEffects.ts
    useTrainingHistory.ts
  services/
    audio/
      soundEngine.ts
    storage/
      localStorage.ts
    training/
      localTrainingResultRepository.ts
      trainingResultRepository.ts
    appContainer.ts
  types/
    index.ts
  App.tsx
  main.tsx
  index.css
docs/
  PROJECT_DOCUMENTATION_TH.md
src-tauri/
  Cargo.toml
  tauri.conf.json
  icons/
  src/
```

## 9. Data Model

### Lesson

- `id`
- `language`
- `level`
- `title`
- `description`
- `focusKeys`
- `content`
- `targetWpm`

### TypingSession

- `lessonId`
- `content`
- `status`
- `currentIndex`
- `typedText`
- `pressedKey`
- `startedAt`
- `endedAt`
- `keystrokes`
- `correctKeystrokes`
- `errorCount`
- `weakKeyMap`

### TrainingResult

- `id`
- `lessonId`
- `lessonTitle`
- `language`
- `accuracy`
- `wpm`
- `errors`
- `durationSeconds`
- `typedCharacters`
- `weakKeyMap`
- `createdAt`

### SoundSettings

- `enabled`
- `volume`

## 10. รายละเอียดโมดูลหลัก

### 10.1 Typing Engine

ไฟล์: [typingEngine.ts](/e:/thai-typing-trainer/src/features/typing/typingEngine.ts)

หน้าที่

- สร้าง session ใหม่
- ตรวจว่าคีย์ที่กดตรงกับ expected character หรือไม่
- เก็บจำนวน keystrokes ที่ถูกและผิด
- สะสม weak keys
- คำนวณ `WPM`
- คำนวณ `Accuracy`
- สร้าง `TrainingResult`

สูตรที่ใช้

- `Accuracy = correctKeystrokes / keystrokes * 100`
- `WPM = correctKeystrokes / 5 / minutes`

### 10.2 Lesson Management

ไฟล์: [lessonData.ts](/e:/thai-typing-trainer/src/features/lesson/lessonData.ts)

หน้าที่

- เก็บ lesson ของไทยและอังกฤษ
- filter lessons ตามภาษา
- สร้าง personalized lesson จาก weak keys ล่าสุด

### 10.3 Keyboard Visualization

ไฟล์: [keyboardLayouts.ts](/e:/thai-typing-trainer/src/features/keyboard/keyboardLayouts.ts)

หน้าที่

- เก็บ layout ของภาษาไทยและอังกฤษ
- map finger ของแต่ละคีย์
- ช่วยตรวจว่า key ใดตรงกับ character เป้าหมาย

### 10.4 Statistics Layer

ไฟล์: [statisticsSelectors.ts](/e:/thai-typing-trainer/src/features/statistics/statisticsSelectors.ts)

หน้าที่

- สรุปจำนวน session
- หา average accuracy
- หา average wpm
- หา best wpm
- รวมเวลาฝึก
- หา weak keys ที่พลาดบ่อย

### 10.5 Sound System

ไฟล์:

- [soundEngine.ts](/e:/thai-typing-trainer/src/services/audio/soundEngine.ts)
- [useSoundEffects.ts](/e:/thai-typing-trainer/src/hooks/useSoundEffects.ts)
- [SoundControls.tsx](/e:/thai-typing-trainer/src/components/SoundControls.tsx)

รายละเอียด

- ใช้ `Web Audio API`
- ไม่ต้องมีไฟล์เสียงแยก
- มีเสียง 3 ประเภท
  - correct
  - error
  - complete
- ผู้ใช้เปิด/ปิดเสียงได้
- ผู้ใช้ปรับระดับเสียงได้
- browser จะ unlock audio หลังมี interaction

### 10.6 Persistence Layer

ไฟล์:

- [localStorage.ts](/e:/thai-typing-trainer/src/services/storage/localStorage.ts)
- [localTrainingResultRepository.ts](/e:/thai-typing-trainer/src/services/training/localTrainingResultRepository.ts)

หลักการ

- แยก storage helper ออกจาก repository
- ให้ UI คุยกับ repository abstraction
- เปลี่ยนเป็น backend repository ได้ในอนาคตโดยไม่ต้องรื้อ UI

### 10.7 Desktop Runtime Layer

ไฟล์:

- [tauri.conf.json](/e:/thai-typing-trainer/src-tauri/tauri.conf.json)
- [Cargo.toml](/e:/thai-typing-trainer/src-tauri/Cargo.toml)
- [main.rs](/e:/thai-typing-trainer/src-tauri/src/main.rs)
- [lib.rs](/e:/thai-typing-trainer/src-tauri/src/lib.rs)

หน้าที่

- ครอบ frontend React/Vite ให้เป็น native desktop window
- กำหนดขนาดหน้าต่างเริ่มต้นของ Windows app
- กำหนด bundle metadata และ installer targets
- รัน frontend dev server ผ่าน `beforeDevCommand`
- ใช้ `../dist` เป็น frontend asset สำหรับ production bundle

### 10.8 Desktop About / Settings Layer

ไฟล์:

- [DesktopControlPanel.tsx](/e:/thai-typing-trainer/src/components/DesktopControlPanel.tsx)
- [TypeFlowMark.tsx](/e:/thai-typing-trainer/src/components/TypeFlowMark.tsx)
- [useDesktopRuntime.ts](/e:/thai-typing-trainer/src/hooks/useDesktopRuntime.ts)

หน้าที่

- แสดงข้อมูลเวอร์ชันของแอปและ Tauri runtime
- ตรวจจับว่าแอปกำลังรันใน browser หรือ desktop
- ควบคุม window state เช่น always-on-top, fullscreen, center window
- เก็บ desktop preferences ไว้ใน local storage

## 11. Local Storage Schema

ระบบใช้ key หลักดังนี้

- `typeflow.language`
- `typeflow.lesson-id`
- `typeflow.sound-settings`
- `typeflow.training-results`

### ตัวอย่าง sound settings

```json
{
  "enabled": true,
  "volume": 0.35
}
```

### ตัวอย่าง training results

```json
[
  {
    "id": "en-home-row-1748772000000",
    "lessonId": "en-home-row",
    "lessonTitle": "English Home Row",
    "language": "en",
    "accuracy": 97.4,
    "wpm": 31.2,
    "errors": 1,
    "durationSeconds": 28,
    "typedCharacters": 36,
    "weakKeyMap": {
      "j": 1
    },
    "createdAt": "2026-06-01T10:00:00.000Z"
  }
]
```

## 12. User Flow

1. ผู้ใช้เปิดแอป
2. เลือกภาษา
3. เลือกบทเรียน
4. โฟกัสช่องพิมพ์
5. เริ่มพิมพ์
6. ระบบอัปเดต WPM / Accuracy / Error แบบ real-time
7. ระบบเล่นเสียงเมื่อพิมพ์ถูกหรือผิด
8. เมื่อจบบทเรียน ระบบเล่นเสียง complete
9. ระบบบันทึกผลลง local storage
10. Dashboard อัปเดตสถิติและ weak keys

## 13. Responsive Design

- layout หลักปรับจากหลายคอลัมน์เป็นคอลัมน์เดียวบนหน้าจอเล็ก
- cards ใช้ spacing และ contrast ชัดเจน
- keyboard grid อ่านง่ายบน desktop และ tablet
- typing panel ยังคงใช้งานได้บนหน้าจอขนาดเล็ก

## 14. การทดสอบ

ตรวจสอบแล้วด้วย

```bash
npm run lint
npm run build
```

ผลลัพธ์

- ESLint ผ่าน
- TypeScript build ผ่าน
- Vite production build ผ่าน
- Tauri config ถูก scaffold และตรวจสอบด้วย `npx tauri info`

หมายเหตุ

- ยังไม่มี unit test automation
- in-app browser verification ทำไม่ได้ใน session ก่อนหน้าเพราะ browser surface ไม่พร้อมใช้งาน
- การ build `.exe` จริงยังต้องติดตั้ง Rust toolchain และ Visual Studio Build Tools เพิ่มบนเครื่อง

## 15. ข้อกำหนดสำหรับ Windows Build

หากต้องการ build โปรแกรม Windows จากเครื่องพัฒนา ต้องมีอย่างน้อย

- `rustup`
- `rustc`
- `cargo`
- Visual Studio Build Tools พร้อม MSVC และ Windows SDK
- WebView2 Runtime

คำสั่งหลัก

```bash
npm run tauri:dev
npm run tauri:build
```

ผลลัพธ์ของ build จะถูกสร้างไว้ใน

- `src-tauri/target/release/typeflow.exe`
- `src-tauri/target/release/bundle/nsis/TypeFlow_0.1.0_x64-setup.exe`
- `src-tauri/target/release/bundle/msi/TypeFlow_0.1.0_x64_en-US.msi`

แนวทางการแจกจ่าย

- ใช้ `NSIS .exe` เป็นตัวติดตั้งหลักสำหรับผู้ใช้ทั่วไป
- ใช้ `MSI` เมื่อต้องการ deploy ผ่านเครื่องมือจัดการเครื่องในองค์กร

## 16. แนวทางต่อยอด Backend

สามารถขยายเป็น backend-driven architecture ได้โดยคง contract เดิมไว้

บริการที่ควรมีในอนาคต

- `AuthService`
- `LessonService`
- `TrainingResultService`
- `DashboardService`
- `PersonalizedPracticeService`

ตัวอย่าง endpoint

- `GET /api/lessons?language=th`
- `POST /api/training-results`
- `GET /api/dashboard`
- `GET /api/personalized-lessons`

## 17. Roadmap แนะนำ

### ระยะสั้น

- เพิ่ม speed test mode
- เพิ่ม sentence pack
- เพิ่ม reset progress เฉพาะภาษา
- เพิ่ม visual summary หลังจบบทเรียน
- เพิ่ม auto-update channel สำหรับ desktop

### ระยะกลาง

- เพิ่ม React Router
- เพิ่ม login
- sync ข้อมูลขึ้น cloud
- เพิ่มโปรไฟล์ผู้ใช้
- เพิ่ม signed Windows release ผ่าน CI

### ระยะยาว

- leaderboard
- multiplayer typing race
- AI coach
- voice guidance
- mobile app
- desktop app

## 18. CI/CD สำหรับ Windows

ไฟล์ workflow:

- [.github/workflows/windows-tauri.yml](/e:/thai-typing-trainer/.github/workflows/windows-tauri.yml)

บทบาทของ workflow

- build แอปบน `windows-latest`
- ติดตั้ง Rust stable
- cache Rust dependencies
- รัน lint และ web build
- เรียก `tauri-apps/tauri-action` เพื่อสร้าง Windows bundles
- อัปโหลด artifacts ของ workflow เพื่อนำไปดาวน์โหลดจาก GitHub Actions

## 19. สรุป

TypeFlow เวอร์ชันปัจจุบันเป็น MVP ที่พร้อมใช้งานจริงสำหรับฝึกพิมพ์ผ่านเว็บ โดยมีทั้ง typing engine, keyboard visualization, dashboard, persistence, และ sound feedback พร้อมโครงสร้างที่สามารถขยายต่อได้อย่างเป็นระบบ
