import WindowControls from '@renderer/components/custom/window-controls'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger
} from '@renderer/components/ui/menubar'
import useUtils from '@renderer/hooks/use-utils'
// import { webFrame } from 'electron'
import { Minus, Monitor, Moon, Palette, Plus, RotateCcw, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

const ApplicationMenubar = () => {
  const { fullHeight } = useUtils()

  // Only applies to Mac OS
  if (fullHeight) {
    return null
  }

  if (window.electron.process.platform === 'darwin')
    return (
      <div
        className="fixed w-full h-[40px] bg-background z-[1000] top-0 left-0 flex border-b-2 justify-between items-center"
        style={{ appRegion: 'drag' } as React.CSSProperties & { [key: string]: any }}
      ></div>
    )
  return (
    <div
      className="fixed w-full h-[40px] bg-background z-[1000] top-0 left-0 flex border-b-2 justify-between items-center"
      style={{ appRegion: 'drag' } as React.CSSProperties & { [key: string]: any }}
    >
      {/* Logo */}
      <div className="flex gap-2 items-center ml-4">
        <div className="select-none mr-3">
          <p className="text-lg">
            <span className="font-bold">NEO</span> | <span className="font-extralight">Studio</span>
            <span className="font-bold"></span>
          </p>
        </div>
        <div className="w-[2px] h-[32px] bg-border"></div>
        {/* ShadCN Menubar */}
        <CustomMenubarMenu />
      </div>
      {/* Window Controls */}
      <WindowControls />
    </div>
  )
}

const CustomMenubarMenu = () => {
  return (
    <Menubar
      className="!z-[100000] !border-none"
      style={{ appRegion: 'no-drag' } as React.CSSProperties & { [key: string]: any }}
    >
      {/* File Dropdown */}
      <FileDropdown />
      <MenubarMenu>
        <MenubarTrigger>Query</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>New Window</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Share</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Results</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>New Window</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Share</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      {/* View Controls */}
      <ViewDropdown />
      <MenubarMenu>
        <MenubarTrigger>Window</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>New Window</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Share</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Help</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>New Window</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Share</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

const FileDropdown = () => {
  return (
    <MenubarMenu>
      <MenubarTrigger>File</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          <Palette />
          Preferences
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  )
}
const ViewDropdown = () => {
  const { setTheme } = useTheme()
  function zoomIn(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault()
    event.stopPropagation()
    window.api.zoomIn()
    // window.Electron.webFrame.setZoomFactor(webFrame.getZoomFactor() + 0.1)
  }

  function zoomOut(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault()
    event.stopPropagation()
    window.api.zoomOut()
  }

  function resetZoom(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault()
    event.stopPropagation()
    window.api.zoomReset()
  }
  return (
    <MenubarMenu>
      <MenubarTrigger>View</MenubarTrigger>
      <MenubarContent>
        <MenubarItem
          onClick={(e) => {
            zoomIn(e)
          }}
        >
          <Plus />
          Zoom In
        </MenubarItem>{' '}
        <MenubarItem
          onClick={(e) => {
            zoomOut(e)
          }}
        >
          <Minus />
          Zoom Out
        </MenubarItem>
        <MenubarItem
          onClick={(e) => {
            resetZoom(e)
          }}
        >
          <RotateCcw />
          Reset Zoom
        </MenubarItem>
        <MenubarSub>
          <MenubarSubTrigger>
            <div className="flex gap-2 items-center">
              <Palette size={15} className="text-muted-foreground" /> Theme
            </div>
          </MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem onClick={() => setTheme('dark')}>
              <Moon />
              Dark
            </MenubarItem>
            <MenubarItem onClick={() => setTheme('light')}>
              <Sun />
              Light
            </MenubarItem>
            <MenubarItem onClick={() => setTheme('system')}>
              <Monitor />
              System
            </MenubarItem>
          </MenubarSubContent>
        </MenubarSub>
      </MenubarContent>
    </MenubarMenu>
  )
}

export default ApplicationMenubar
