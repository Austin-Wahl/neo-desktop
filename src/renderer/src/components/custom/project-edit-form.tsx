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
import { AlertCircle, FolderOpen, Save, XIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

const ProjectEditForm = ({
  project,
  showProjectEditForm,
  setShowProjectEditForm,
  onUpdate
}: {
  project: Project | null
  showProjectEditForm: boolean
  setShowProjectEditForm: (state: boolean) => void
  onUpdate: (updatedProject: Project) => void
}) => {
  const [loading, setLoading] = useState(false)

  // State for a project
  const [color, setColor] = useState<string>('')
  const [directory, setDirectory] = useState<string | null>(null)
  const [projectName, setProjectName] = useState<string>('No Name')

  // Effect to initialize values
  useEffect(() => {
    if (!project) return
    setColor(Color(project.color).hex())
    setDirectory(project.directory)
    setProjectName(project.name)
  }, [project])

  // State for error
  const [errMsg, setErrMsg] = useState<{ title: string; msg: string } | null>(null)

  function handleSave() {
    if (!project) return
    try {
      window.api.log({
        level: 'INFO',
        message: 'Attempting Update for project: ' + project.id
      })
      setLoading(true)

      const doesDirectoryExist = window.api.doesDirectoryOrFileExist(directory)
      if (directory !== null && !doesDirectoryExist) {
        console.log({ directory })
        console.log({ doesDirectoryExist })
        setErrMsg({
          msg: 'The directory you selected does not exist. It may have been deleted.',
          title: 'Directory not found!'
        })
      }

      // Updated project object
      const updatedProject: Project = {
        ...project,
        color: color,
        name: projectName,
        directory: directory!
      }

      // Callback
      function cb() {
        onUpdate(updatedProject)
      }
      cb()
    } catch (error) {
      window.api.log({
        level: 'ERROR',
        error: error instanceof Error ? error : new Error(String(error))
      })
    } finally {
      window.api.log({
        level: 'INFO',
        message: 'Exiting Update.'
      })
      setLoading(false)
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

  if (!project) return

  return (
    <Dialog open={showProjectEditForm} onOpenChange={setShowProjectEditForm}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
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
            <Button onClick={() => setShowProjectEditForm(false)} variant="outline">
              Close
            </Button>
          </DialogClose>
          <Button onClick={handleSave} disabled={loading}>
            <Save />
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ProjectEditForm
