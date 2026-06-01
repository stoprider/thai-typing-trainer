# TypeFlow

TypeFlow คือเว็บแอปฝึกพิมพ์สัมผัสภาษาไทยและภาษาอังกฤษ สร้างด้วย React, TypeScript, Vite และ TailwindCSS โดยออกแบบให้ผู้ใช้ฝึกได้แบบเห็นผลทันที ทั้งด้านความเร็ว ความแม่นยำ การวางนิ้ว และการติดตามพัฒนาการย้อนหลัง

## ความสามารถหลัก

- เลือกภาษา `Thai` และ `English`
- ระบบบทเรียนหลายระดับ
- Personalized practice จาก weak keys
- แสดงคีย์บอร์ดพร้อม finger mapping
- ตรวจจับการพิมพ์ถูกและผิดแบบ real-time
- คำนวณ `WPM`, `Accuracy`, `Errors`
- Dashboard สรุปผลย้อนหลัง
- บันทึกข้อมูลด้วย `localStorage`
- ระบบเสียงตอบกลับ เปิด/ปิดได้ และปรับความดังได้
- โครงสร้างพร้อมต่อ backend ในอนาคต
- Desktop controls สำหรับ Tauri เช่น always-on-top / fullscreen / center window

## เทคโนโลยี

- React 19
- TypeScript
- Vite
- TailwindCSS
- Tauri 2
- Web Audio API
- ESLint

## เริ่มต้นใช้งาน

### ติดตั้ง dependency

```bash
npm install
```

### รันโปรเจ็กต์ในโหมดพัฒนา

```bash
npm run dev
```

### build สำหรับ production

```bash
npm run build
```

### รันแบบ Windows Desktop ด้วย Tauri

```bash
npm run tauri:dev
```

### build ไฟล์ติดตั้ง Windows

```bash
npm run tauri:build
```

### ตรวจคุณภาพโค้ด

```bash
npm run lint
```

## โครงสร้างโปรเจ็กต์

```text
src/
  components/   # reusable UI components
  features/     # business/domain logic
  hooks/        # reusable stateful logic
  services/     # storage, audio, repository abstraction
  types/        # shared contracts and models
src-tauri/      # Tauri desktop runtime (Rust + bundling config)
```

## เอกสารประกอบ

เอกสารฉบับเต็มของโครงการอยู่ที่:

- [PROJECT_DOCUMENTATION_TH.md](/e:/thai-typing-trainer/docs/PROJECT_DOCUMENTATION_TH.md)

## สถานะปัจจุบัน

MVP ที่พร้อมใช้งานแล้วในเวอร์ชันนี้:

- Thai typing lessons
- English typing lessons
- Statistics dashboard
- Local persistence
- Sound feedback system
- Windows desktop app ผ่าน Tauri

## การแจกจ่ายบน Windows

หลังจาก build ด้วย `npm run tauri:build` จะได้ไฟล์หลักอยู่ที่:

- `src-tauri/target/release/bundle/nsis/TypeFlow_0.1.0_x64-setup.exe`
- `src-tauri/target/release/bundle/msi/TypeFlow_0.1.0_x64_en-US.msi`

ถ้าต้องการติดตั้งให้ผู้ใช้ทั่วไป แนะนำแจกไฟล์ `NSIS .exe` เป็นหลัก และเก็บ `MSI` ไว้สำหรับองค์กรหรือ deployment tools

## GitHub Actions

โปรเจ็กต์มี workflow สำหรับ build Windows อัตโนมัติแล้วที่:

- [.github/workflows/windows-tauri.yml](/e:/thai-typing-trainer/.github/workflows/windows-tauri.yml)
- [.github/workflows/windows-release.yml](/e:/thai-typing-trainer/.github/workflows/windows-release.yml)

workflow นี้จะ:

- ติดตั้ง Node.js และ Rust
- รัน `npm ci`
- รัน `npm run lint`
- รัน `npm run build`
- build Tauri สำหรับ Windows
- อัปโหลด bundle เป็น workflow artifacts

ส่วน release workflow จะ:

- ทำงานเมื่อ push tag รูปแบบ `v*`
- สร้าง GitHub Release แบบ draft
- แนบไฟล์ `.exe`, `.msi` และ updater metadata
- ใช้ signing key จาก GitHub Secrets เพื่อรองรับ auto-update

Secrets ที่ต้องตั้งค่าใน GitHub repository:

- `TAURI_SIGNING_PRIVATE_KEY`
- `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`

## แผนพัฒนาต่อ

- เพิ่ม unit tests สำหรับ typing engine
- เพิ่ม routing และแยกหน้า lesson/dashboard
- เพิ่ม backend API integration
- เพิ่มระบบสมาชิกและ cloud sync
- เพิ่ม leaderboard และ AI coach

## หมายเหตุ

- ระบบเสียงใช้ `Web Audio API` และ browser จะเริ่มเล่นเสียงหลังมี user interaction
- ข้อมูลสถิติถูกเก็บไว้ใน browser ของผู้ใช้ผ่าน `localStorage`
- การ build เป็น `.exe` ต้องมี Rust toolchain (`rustup`, `cargo`, `rustc`) ติดตั้งบนเครื่องก่อน
