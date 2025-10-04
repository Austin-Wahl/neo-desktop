import { ElectronAPI } from '@electron-toolkit/preload'
import { UserPreferences } from '@src/main/store'
import { LoggingObject } from '@src/types/logging'
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
  getWindowState: () => Promise<WindowState>
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
  onAppReady: (callback: () => void) => void
  signalRendererReady: () => void
  log: (
    logObject:
      | {
          level: 'ERROR'
          error: Error
        }
      | {
          level: 'WARN' | 'INFO'
          message: string
        }
  ) => Promise<void>
  writeTextToClipboard: (text: string) => void
  readTextFromClipboard: () => string
  showItemInFolder: (directory: string) => boolean
  getPath: (
    path:
      | 'home'
      | 'appData'
      | 'userData'
      | 'sessionData'
      | 'temp'
      | 'exe'
      | 'module'
      | 'desktop'
      | 'documents'
      | 'downloads'
      | 'music'
      | 'pictures'
      | 'videos'
      | 'recent'
      | 'logs'
      | 'crashDumps'
  ) => Promise<string>
  selectDirectory: (operation: 'export' | 'import') => Promise<string | null>
  doesDirectoryOrFileExist: (path: string | null) => boolean
}
