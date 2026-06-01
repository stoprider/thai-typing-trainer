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

## เทคโนโลยี

- React 19
- TypeScript
- Vite
- TailwindCSS
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

## แผนพัฒนาต่อ

- เพิ่ม unit tests สำหรับ typing engine
- เพิ่ม routing และแยกหน้า lesson/dashboard
- เพิ่ม backend API integration
- เพิ่มระบบสมาชิกและ cloud sync
- เพิ่ม leaderboard และ AI coach

## หมายเหตุ

- ระบบเสียงใช้ `Web Audio API` และ browser จะเริ่มเล่นเสียงหลังมี user interaction
- ข้อมูลสถิติถูกเก็บไว้ใน browser ของผู้ใช้ผ่าน `localStorage`
