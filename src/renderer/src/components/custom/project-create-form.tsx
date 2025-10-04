import { Alert, AlertDescription, AlertTitle } from '@renderer/components/ui/alert'
import { Button } from '@renderer/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@renderer/components/ui/dialog'
import { Input } from '@renderer/components/ui/input'
import {
  ColorPicker,
  ColorPickerAlpha,
  ColorPickerEyeDropper,
  ColorPickerFormat,
  ColorPickerHue,
  ColorPickerOutput,
  ColorPickerSelection
} from '@renderer/components/ui/shadcn-io/color-picker'
import { cn } from '@renderer/lib/utils'
import { Project } from '@src/types/types'
import Color from 'color'
import { AlertCircle, FolderOpen, PlusIcon, XIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import uniqolor from 'uniqolor'
import { v4 } from 'uuid'

const ProjectCreateForm = ({
  showProjectCreateForm,
  setShowProjectCreateForm,
  onCreate
}: {
  showProjectCreateForm: boolean
  setShowProjectCreateForm: (state: boolean) => void
  onCreate: (createdProject: Project) => void
}) => {
  const [loading, setLoading] = useState(false)

  // State for a project
  const [projectId, setProjectId] = useState(v4())
  const [color, setColor] = useState<string>(uniqolor(projectId, { format: 'hex' }).color)
  const [directory, setDirectory] = useState<string | null>(null)
  const [projectName, setProjectName] = useState<string>('New Project')

  // Effect for updating save directory location when ID is genreated
  useEffect(() => {
    if (!projectId) return
    async function init() {
      setDirectory((await window.api.getPath('appData')) + '/projects/')
    }
    init()
  }, [projectId])

  // State for error
  const [errMsg, setErrMsg] = useState<{ title: string; msg: string } | null>(null)

  function handleCreate() {
    try {
      window.api.log({
        level: 'INFO',
        message: 'Attempting Create for project.'
      })
      setLoading(true)

      const doesDirectoryExist = window.api.doesDirectoryOrFileExist(directory)
      if (directory !== null && !doesDirectoryExist) {
        setErrMsg({
          msg: 'The directory you selected does not exist. It may have been deleted.',
          title: 'Directory not found!'
        })
        throw new Error('The directory chosen by user does not exist.')
      }

      // TODO: Implement Logic

      function cb() {
        //   onCreate(project)
      }
      cb()
    } catch (error) {
      window.api.log({
        level: 'ERROR',
        error: error instanceof Error ? error : new Error(String(error))
      })
    } finally {
      setLoading(false)
      window.api.log({
        level: 'INFO',
        message: 'Exiting Create.'
      })
    }
  }

  async function handleDirectoryClick() {
    const directory = await window.api.selectDirectory('export')
    if (directory == null) return
    if (!directory) {
      setErrMsg({
        msg: 'A directory was not found',
        title: 'This directory does not exist'
      })
      return
    }
    setDirectory(directory)
  }

  return (
    <Dialog open={showProjectCreateForm} onOpenChange={setShowProjectCreateForm}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {errMsg !== null && (
            <Alert className="flex justify-between" variant="destructive">
              <AlertCircle />
              <div className="flex flex-1 flex-col gap-1">
                <AlertTitle>{errMsg.title}</AlertTitle>
                <AlertDescription>{errMsg.msg}</AlertDescription>
              </div>
              <button className="cursor-pointer" onClick={() => setErrMsg(null)}>
                <XIcon className="size-5" />
                <span className="sr-only">Close</span>
              </button>
            </Alert>
          )}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Project Name</p>
            <Input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Project Name"
              autoFocus={false}
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Project Directory</p>
            <div
              onClick={handleDirectoryClick}
              className={cn(
                'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                'flex items-center justify-between cursor-pointer'
              )}
            >
              <div className="py-1">
                <p>{directory}</p>
              </div>
              <div className="border-l-[1px] pl-3 h-full flex items-center justify-center border-border">
                <FolderOpen className="w-[16px] h-[16px]" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <ColorPicker
            className="rounded-md border bg-background p-4 shadow-sm"
            defaultValue={color}
            onChange={(e) => {
              const red = Math.ceil(e[0])
              const green = Math.ceil(e[1])
              const blue = Math.ceil(e[2])
              // console.log(e)
              setColor(Color({ r: red, g: green, b: blue }).hex())
            }}
          >
            <ColorPickerSelection />
            <div className="flex items-center gap-4">
              <ColorPickerEyeDropper />
              <div className="grid w-full gap-1">
                <ColorPickerHue />
                <ColorPickerAlpha />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ColorPickerOutput />
              <ColorPickerFormat />
            </div>
          </ColorPicker>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => setShowProjectCreateForm(false)} variant="outline">
              Close
            </Button>
          </DialogClose>
          <Button onClick={handleCreate} disabled={loading}>
            <PlusIcon />
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ProjectCreateForm
