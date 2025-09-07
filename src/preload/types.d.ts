import { ElectronAPI } from '@electron-toolkit/preload'
import { createDatabaseConnectionSchema } from '@src/validation-schemas/connection'
import z from 'zod'

declare global {
  interface Window {
    electron: ElectronAPI
    api: ElectronCustomAPI
    neoIpcApi: NeoAPI
  }
  interface WindowState {
    isFullScreen: boolean
    isMaximized: boolean
    isMinimized: boolean
  }
}

export interface NeoAPI {
  createConnection: (data: z.infer<typeof createDatabaseConnectionSchema>) => Promise<void>
}

export interface ElectronCustomAPI {
  minimize()
  maximize()
  close()
  restore()
  getWindowState: () => Promise<>
  onWindowStateChange: (callback: (state: WindowState) => void) => void
  zoomIn()
  zoomOut()
  zoomReset()
  openExternal: (url: string) => Promise<void>
  getPreference: <K extends keyof UserPreferences>(key: K) => Promise<UserPreferences[K]>
  setPreference: <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => Promise<void>
  getSystemTheme: () => Promise<'light' | 'dark'>
  onSystemThemeChanged: (callback: (theme: 'light' | 'dark') => void) => void
}
