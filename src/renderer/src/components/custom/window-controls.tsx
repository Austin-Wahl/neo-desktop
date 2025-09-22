import { Button } from '@renderer/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@renderer/components/ui/dialog'
import { Maximize, Minimize, Minus, X } from 'lucide-react'
import { useEffect, useState } from 'react'

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

export default WindowControls
