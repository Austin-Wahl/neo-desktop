import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, ipcMain, Menu, nativeTheme, shell } from 'electron'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'
import { getPreference, getSystemTheme, setPreference, UserPreferences } from './store'
import './application-menu-mac'

let mainWindow: BrowserWindow | undefined = undefined

app.name = 'Neo'

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 720,
    minWidth: 700,
    minHeight: 500,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false
    },
    trafficLightPosition: {
      x: 12,
      y: 12
    },
    // ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {}),
    icon: join(__dirname, '../../resources/icon.png'),
    titleBarStyle: 'hidden',
    frame: false
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow!.show()
  })

  mainWindow!.on('enter-full-screen', sendState)
  mainWindow!.on('leave-full-screen', sendState)
  mainWindow!.on('maximize', sendState)
  mainWindow!.on('unmaximize', sendState)
  mainWindow!.on('minimize', sendState)
  mainWindow!.on('restore', sendState)

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  nativeTheme.on('updated', () => {
    const currentTheme = getPreference('theme')
    if (currentTheme === 'system' && mainWindow) {
      mainWindow.webContents.send(
        'system-theme-changed',
        nativeTheme.shouldUseDarkColors ? 'dark' : 'light'
      )
    }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

ipcMain.on('window:minimize', () => {
  mainWindow!.minimize()
})

ipcMain.on('window:maximize', () => {
  if (mainWindow!.isMaximized()) {
    mainWindow!.unmaximize()
  } else {
    mainWindow!.maximize()
  }
})

ipcMain.on('window:close', () => {
  mainWindow!.close()
})
ipcMain.on('window:restore', () => {
  mainWindow!.restore()
})

ipcMain.handle('get-window-state', () => {
  return {
    isFullScreen: mainWindow!.isFullScreen(),
    isMaximized: mainWindow!.isMaximized(),
    isMinimized: mainWindow!.isMinimized()
  }
})

ipcMain.on('zoom-in', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  const currentZoom = win!.webContents.getZoomFactor()
  win!.webContents.setZoomFactor(currentZoom + 0.1)
})

ipcMain.on('zoom-out', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  const currentZoom = win!.webContents.getZoomFactor()
  win!.webContents.setZoomFactor(Math.max(currentZoom - 0.1, 0.25)) // min 25%
})

ipcMain.on('zoom-reset', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  win!.webContents.setZoomFactor(1.0) // reset to 100%
})

// Broadcast state changes
function sendState() {
  mainWindow!.webContents.send('window-state', {
    isFullScreen: mainWindow!.isFullScreen(),
    isMaximized: mainWindow!.isMaximized(),
    isMinimized: mainWindow!.isMinimized()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.neo.studio')
  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.handle('get-preference', (_event, key: keyof UserPreferences) => {
  return getPreference(key)
})

ipcMain.handle(
  'set-preference',
  (event, key: keyof UserPreferences, value: UserPreferences[typeof key]) => {
    setPreference(key, value)
    BrowserWindow.getAllWindows().forEach((win) => {
      if (win.id !== event.sender.id) {
        // Don't send back to the sender
        win.webContents.send('preferences-updated', { [key]: value })
      }
    })
    return true // Indicate success
  }
)

ipcMain.handle('get-system-theme', () => {
  return getSystemTheme()
})
