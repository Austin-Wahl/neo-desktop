import { Button } from '@renderer/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@renderer/components/ui/dialog'
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
import {
  Maximize,
  Minimize,
  Minus,
  Monitor,
  Moon,
  Palette,
  Plus,
  RotateCcw,
  Sun,
  X
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const ApplicationMenubar = () => {
  const { fullHeight } = useUtils()

  if (fullHeight) {
    return null
  }

  if (window.electron.process.platform)
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
const WindowControls = () => {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [confirmCloseDialogOpen, setConfirmCloseDialogOpen] = useState(false)
  useEffect(() => {
    window.api.getWindowState().then((state) => {
      setIsFullScreen(state.isMaximized)
    })

    window.api.onWindowStateChange((state: WindowState) => {
      setIsFullScreen(state.isMaximized)
    })
  }, [])

  return (
    <>
      <div
        className="flex"
        style={{ appRegion: 'no-drag' } as React.CSSProperties & { [key: string]: any }}
      >
        <button
          className="w-[60px] h-[40px] flex items-center justify-center transition-all duration-100 hover:bg-secondary"
          onClick={() => {
            window.api.minimize()
          }}
        >
          <Minus className="w-[16px]" />
        </button>

        {isFullScreen ? (
          <button
            className="w-[60px] h-[40px] flex items-center justify-center transition-all duration-100 hover:bg-secondary"
            onClick={() => {
              window.api.restore()
            }}
          >
            <Minimize className="!w-[16px]" />
          </button>
        ) : (
          <button
            className="w-[60px] h-[40px] flex items-center justify-center transition-all duration-100 hover:bg-secondary"
            onClick={() => {
              window.api.maximize()
            }}
          >
            <Maximize className="!w-[16px]" />
          </button>
        )}

        <button
          className="w-[60px] h-[40px] flex items-center justify-center transition-all duration-100 hover:bg-red-400"
          onClick={() => {
            setConfirmCloseDialogOpen(true)
          }}
        >
          <X className="w-[16px]" />
        </button>
      </div>
      <Dialog open={confirmCloseDialogOpen} onOpenChange={setConfirmCloseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>Are you sure you want to exit Neo?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setConfirmCloseDialogOpen(false)}
              className="cursor-pointer"
              variant={'secondary'}
            >
              Cancel
            </Button>
            <Button
              onClick={() => window.api.close()}
              className="cursor-pointer"
              variant={'destructive'}
            >
              Exit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ApplicationMenubar
