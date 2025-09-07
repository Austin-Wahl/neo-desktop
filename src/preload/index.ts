import { contextBridge, ipcRenderer, shell } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { ElectronCustomAPI, NeoAPI } from './types'
import z from 'zod'
import { createDatabaseConnectionSchema } from '@src/validation-schemas/connection'
import { UserPreferences } from '@src/main/store'

// Custom APIs for renderer
const api: ElectronCustomAPI = {
  minimize: () => ipcRenderer.send('window:minimize'),
  maximize: () => ipcRenderer.send('window:maximize'),
  close: () => ipcRenderer.send('window:close'),
  restore: () => ipcRenderer.send('window:restore'),
  getWindowState: () => ipcRenderer.invoke('get-window-state'),
  onWindowStateChange: (callback) => ipcRenderer.on('window-state', (_, state) => callback(state)),
  zoomIn: () => ipcRenderer.send('zoom-in'),
  zoomOut: () => ipcRenderer.send('zoom-out'),
  zoomReset: () => ipcRenderer.send('zoom-reset'),
  openExternal: (url: string) => shell.openExternal(url),
  getPreference: () => ipcRenderer.invoke('get-preference'),
  getSystemTheme: () => ipcRenderer.invoke('get-system-theme'),
  onSystemThemeChanged: (callback: (theme: 'light' | 'dark') => void) => {
    ipcRenderer.on('system-theme-changed', (event, theme) => callback(theme))
  },
  setPreference: (key, value) => ipcRenderer.invoke('set-preference', key, value)
}

const neoApi: NeoAPI = {
  createConnection: (data: z.infer<typeof createDatabaseConnectionSchema>) =>
    ipcRenderer.invoke('create-neo-connection', data)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('neoApi', neoApi)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
