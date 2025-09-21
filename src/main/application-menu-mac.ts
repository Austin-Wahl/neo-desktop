// Neo has different user interfaces on MAC and WINDOWS platforms
// The differences are subtle but the menu bar is one
// This file handles the menu bar for the Mac OS version of NEO
// It has all the same functionality but uses the formalities of the mac ecosystem for a better expierence
// const { shell } = require('electron/common')
// const { app, Menu } = require('electron/main')

import { MenuItemConstructorOptions } from 'electron'
import { app, Menu } from 'electron/main'

const queryMenu: Electron.MenuItemConstructorOptions[] = [
  {
    label: 'Query',
    submenu: [
      {
        label: 'New Query',
        toolTip: 'Opens a new SQL editor'
      }
    ]
  }
]

const resultMenu: Electron.MenuItemConstructorOptions[] = [
  {
    label: 'Results',
    submenu: [
      {
        label: 'Open Results',
        toolTip: 'Opens the results from the current query window'
      },
      {
        label: 'Populate in Editor',
        toolTip: 'Populates the query ran in an Editor'
      }
    ]
  }
]

const projectMenu: Electron.MenuItemConstructorOptions[] = [
  {
    label: 'Project',
    submenu: [
      {
        label: 'New Project',
        toolTip: 'Create a new Project'
      }
    ]
  }
]

const viewMenu: Electron.MenuItemConstructorOptions[] = [
  {
    label: 'View',
    submenu: [
      {
        label: 'Open Subviews',
        submenu: [
          {
            label: 'New Editor',
            toolTip: 'Opens a new SQL editor'
          },
          {
            label: 'Results',
            toolTip: 'Opens an empty Results window'
          },
          {
            label: 'Scratchpad',
            toolTip: 'Opens an empty scratchpad'
          },
          ...(import.meta.env.DEV
            ? [
                {
                  label: 'Debug',
                  toolTip: 'Opens Debugger Panel'
                }
              ]
            : [])
        ]
      },
      { type: 'separator' },
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  }
]
const isMac = process.platform === 'darwin'
const template = [
  // { role: 'appMenu' }
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideOthers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
          ]
        }
      ]
    : []),
  {
    label: 'File',
    submenu: [isMac ? { role: 'close' } : { role: 'quit' }]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac
        ? [
            { role: 'pasteAndMatchStyle' },
            { role: 'delete' },
            { role: 'selectAll' },
            { type: 'separator' },
            {
              label: 'Speech',
              submenu: [{ role: 'startSpeaking' }, { role: 'stopSpeaking' }]
            }
          ]
        : [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }])
    ]
  },
  ...queryMenu,
  ...resultMenu,
  ...projectMenu,
  ...viewMenu,
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac
        ? [{ type: 'separator' }, { role: 'front' }, { type: 'separator' }, { role: 'window' }]
        : [{ role: 'close' }])
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template as unknown as MenuItemConstructorOptions[])
Menu.setApplicationMenu(menu)
