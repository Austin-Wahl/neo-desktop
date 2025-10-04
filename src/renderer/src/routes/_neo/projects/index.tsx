import ProjectCreateForm from '@renderer/components/custom/project-create-form'
import { ProjectsList } from '@renderer/components/custom/projects-list'
import { Button } from '@renderer/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@renderer/components/ui/dropdown-menu'
import { Input } from '@renderer/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@renderer/components/ui/select'
import useUtils from '@renderer/hooks/use-utils'
import { createFileRoute } from '@tanstack/react-router'
import { EllipsisVertical, PlusIcon, TrashIcon } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/_neo/projects/')({
  component: RouteComponent
})

function RouteComponent() {
  const { fullHeight } = useUtils()
  return (
    <div className={`w-full h-[calc(100vh-40px)] min-h-[500px] ${fullHeight && 'h-screen'}`}>
      <div className={`sticky top-[40px] z-[10] ${fullHeight && '!top-0'}`}>
        <HeaderBar />
      </div>
      <div className="p-4 w-full">
        <ProjectsList />
      </div>
    </div>
  )
}

const HeaderBar = () => {
  return (
    <div className="w-full bg-background border-b-1 border-border p-4">
      <div className="flex gap-4 justify-between w-full">
        <div>
          <CreateProjectButton />
        </div>
        <div className="w-full flex gap-4">
          <div className="w-full">
            <Input placeholder="Search your projects..." />
          </div>
          <div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort by</SelectLabel>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="last-opened">Last Opened</SelectItem>
                  <SelectItem value="last-modified">Last Modified</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <ProjectsActionDropdown />
        </div>
      </div>
    </div>
  )
}

const CreateProjectButton = () => {
  const [open, setOpen] = useState(false)

  function onCreate() {
    console.log('created')
  }
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <PlusIcon />
        Create
      </Button>
      <ProjectCreateForm
        onCreate={onCreate}
        setShowProjectCreateForm={setOpen}
        showProjectCreateForm={open}
      />
    </>
  )
}

const ProjectsActionDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Project Actions</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">
            <TrashIcon /> Delete Project
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
