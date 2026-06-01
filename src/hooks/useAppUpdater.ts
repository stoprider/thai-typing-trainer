import { useCallback, useState } from 'react'
import type { UpdaterState } from '../types'

const DEFAULT_STATE: UpdaterState = {
  status: 'idle',
  message: 'พร้อมตรวจสอบอัปเดต',
  progress: 0,
  availableVersion: null,
}

function isDesktopRuntime(): boolean {
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window
}

export function useAppUpdater(isDesktop: boolean) {
  const [updaterState, setUpdaterState] = useState<UpdaterState>(DEFAULT_STATE)

  const runUpdater = useCallback(async () => {
    if (!isDesktop || !isDesktopRuntime()) {
      setUpdaterState({
        status: 'error',
        message: 'การอัปเดตอัตโนมัติใช้ได้เฉพาะเวอร์ชัน desktop',
        progress: 0,
        availableVersion: null,
      })
      return
    }

    setUpdaterState({
      status: 'checking',
      message: 'กำลังตรวจสอบอัปเดต...',
      progress: 0,
      availableVersion: null,
    })

    try {
      const [{ check }, { relaunch }] = await Promise.all([
        import('@tauri-apps/plugin-updater'),
        import('@tauri-apps/plugin-process'),
      ])

      const update = await check()

      if (!update) {
        setUpdaterState({
          status: 'latest',
          message: 'คุณกำลังใช้งานเวอร์ชันล่าสุดอยู่',
          progress: 100,
          availableVersion: null,
        })
        return
      }

      setUpdaterState({
        status: 'available',
        message: `พบเวอร์ชันใหม่ ${update.version} กำลังดาวน์โหลด...`,
        progress: 0,
        availableVersion: update.version,
      })

      let downloaded = 0
      let total = 0

      await update.downloadAndInstall((event) => {
        switch (event.event) {
          case 'Started':
            total = event.data.contentLength ?? 0
            setUpdaterState({
              status: 'downloading',
              message: 'เริ่มดาวน์โหลดแพ็กเกจอัปเดต',
              progress: 0,
              availableVersion: update.version,
            })
            break
          case 'Progress':
            downloaded += event.data.chunkLength
            setUpdaterState({
              status: 'downloading',
              message: 'กำลังดาวน์โหลดอัปเดต...',
              progress: total > 0 ? Math.min(100, Math.round((downloaded / total) * 100)) : 0,
              availableVersion: update.version,
            })
            break
          case 'Finished':
            setUpdaterState({
              status: 'updated',
              message: 'ติดตั้งอัปเดตสำเร็จ กำลังรีสตาร์ตแอป...',
              progress: 100,
              availableVersion: update.version,
            })
            break
        }
      })

      await relaunch()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'ไม่สามารถอัปเดตแอปได้'
      setUpdaterState({
        status: 'error',
        message,
        progress: 0,
        availableVersion: null,
      })
    }
  }, [isDesktop])

  return {
    updaterState,
    runUpdater,
  }
}
