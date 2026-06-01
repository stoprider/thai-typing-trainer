import { useEffect, useState } from 'react'
import type { DesktopPreferences, DesktopRuntimeInfo } from '../types'

const DEFAULT_INFO: DesktopRuntimeInfo = {
  isDesktop: false,
  appVersion: 'web',
  tauriVersion: '-',
  platformLabel: 'Browser',
}

function detectDesktopRuntime(): boolean {
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window
}

function detectPlatformLabel(): string {
  if (typeof navigator === 'undefined') {
    return 'unknown'
  }

  const source = `${navigator.platform} ${navigator.userAgent}`.toLowerCase()

  if (source.includes('win')) {
    return 'windows'
  }

  if (source.includes('mac')) {
    return 'macos'
  }

  if (source.includes('linux')) {
    return 'linux'
  }

  return 'browser'
}

export function useDesktopRuntime(preferences: DesktopPreferences) {
  const [runtimeInfo, setRuntimeInfo] = useState<DesktopRuntimeInfo>({
    ...DEFAULT_INFO,
    isDesktop: detectDesktopRuntime(),
  })

  useEffect(() => {
    if (!detectDesktopRuntime()) {
      return
    }

    let isMounted = true

    async function loadRuntimeInfo() {
      const [{ getVersion, getTauriVersion }, { getCurrentWindow }] = await Promise.all([
        import('@tauri-apps/api/app'),
        import('@tauri-apps/api/window'),
      ])

      const currentWindow = getCurrentWindow()
      const [appVersion, tauriVersion, alwaysOnTop, fullscreen] =
        await Promise.all([
          getVersion(),
          getTauriVersion(),
          currentWindow.isAlwaysOnTop(),
          currentWindow.isFullscreen(),
        ])

      if (!isMounted) {
        return
      }

      setRuntimeInfo({
        isDesktop: true,
        appVersion,
        tauriVersion,
        platformLabel: detectPlatformLabel(),
      })

      if (alwaysOnTop !== preferences.alwaysOnTop) {
        await currentWindow.setAlwaysOnTop(preferences.alwaysOnTop)
      }

      if (fullscreen !== preferences.fullscreen) {
        await currentWindow.setFullscreen(preferences.fullscreen)
      }
    }

    void loadRuntimeInfo()

    return () => {
      isMounted = false
    }
  }, [preferences.alwaysOnTop, preferences.fullscreen])

  async function centerWindow() {
    if (!detectDesktopRuntime()) {
      return
    }

    const { getCurrentWindow } = await import('@tauri-apps/api/window')
    await getCurrentWindow().center()
  }

  async function applyAlwaysOnTop(alwaysOnTop: boolean) {
    if (!detectDesktopRuntime()) {
      return
    }

    const { getCurrentWindow } = await import('@tauri-apps/api/window')
    await getCurrentWindow().setAlwaysOnTop(alwaysOnTop)
  }

  async function applyFullscreen(fullscreen: boolean) {
    if (!detectDesktopRuntime()) {
      return
    }

    const { getCurrentWindow } = await import('@tauri-apps/api/window')
    await getCurrentWindow().setFullscreen(fullscreen)
  }

  async function toggleMaximize() {
    if (!detectDesktopRuntime()) {
      return
    }

    const { getCurrentWindow } = await import('@tauri-apps/api/window')
    const currentWindow = getCurrentWindow()
    const maximized = await currentWindow.isMaximized()

    if (maximized) {
      await currentWindow.unmaximize()
      return
    }

    await currentWindow.maximize()
  }

  return {
    runtimeInfo,
    centerWindow,
    applyAlwaysOnTop,
    applyFullscreen,
    toggleMaximize,
  }
}
