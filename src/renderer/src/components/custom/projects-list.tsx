import ProjectEditForm from '@renderer/components/custom/project-edit-form'
import { Alert, AlertDescription, AlertTitle } from '@renderer/components/ui/alert'
import { Button } from '@renderer/components/ui/button'
import { Checkbox } from '@renderer/components/ui/checkbox'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@renderer/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@renderer/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@renderer/components/ui/table'
import { Tooltip, TooltipContent, TooltipTrigger } from '@renderer/components/ui/tooltip'
import { Project } from '@src/types/types'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState
} from '@tanstack/react-table'
// import { clipboard } from 'electron'
import {
  ArrowUpDown,
  Copy,
  Edit,
  FolderOpen,
  FolderX,
  MoreHorizontal,
  TrashIcon
} from 'lucide-react'
import * as React from 'react'
import uniqolor from 'uniqolor'
import { v4 } from 'uuid'

// Declare module for custom meta field types
declare module '@tanstack/react-table' {
  interface TableMeta<TData extends unknown> {
    setShowError: (value: boolean) => void
    handleEditProject: (project: Project) => void
  }
}

export const columns: ColumnDef<Project>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          (table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')) as boolean
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'color',
    header: () => {},
    cell: ({ row }) => {
      const color: string = row.getValue('color')
      return <div style={{ backgroundColor: color }} className="w-5 h-5 rounded-full"></div>
    }
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>
  },
  {
    accessorKey: 'numOfConnections',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Connections
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue('numOfConnections')}</div>
  },
  {
    accessorKey: 'directory',
    header: () => <div className="">Directory</div>,
    cell: ({ row }) => {
      const dir: string = row.getValue('directory')

      // Format the amount as a dollar amount
      const formatted = dir?.slice(0, 20) + '...'
      return (
        <div className=" font-medium">
          <Tooltip>
            <TooltipTrigger>{formatted}</TooltipTrigger>
            <TooltipContent>
              <p>{row.getValue('directory')}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      )
    }
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Created
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('createdAt')}</div>
    }
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Updated
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('updatedAt')}</div>
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row, table }) => {
      const directory = row.original.directory
      const [open, setOpen] = React.useState(false)
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  window.api.writeTextToClipboard(directory)
                }}
              >
                <Copy /> Copy Project Directory
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  const opened = window.api.showItemInFolder(directory)
                  if (!opened) {
                    table.options.meta!.setShowError(true)
                  } else {
                    table.options.meta!.setShowError(false)
                  }
                }}
              >
                <FolderOpen /> Open in File Explorer
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  table.options.meta!.handleEditProject(row.original)
                }}
              >
                <Edit /> Edit Project
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                <TrashIcon />
                Delete Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    }
  }
]

async function getProjects(): Promise<Record<string, Project>> {
  const directory = Array.from({ length: 20 })

  const projects: Record<string, Project> = {}

  for (let i = 0; i < directory.length; i++) {
    const id = v4()
    const temp: Project = {
      id: id,
      color: uniqolor(v4(), { format: 'hex' }).color,
      directory: await window.api.getPath('userData'),
      name: 'Project ' + i,
      numOfConnections: Math.ceil(Math.random() * 10),
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    } as Project

    projects[id] = temp
  }
  return projects
}

export function ProjectsList() {
  // State for react-table
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  // State for dialogs
  const [showError, setShowError] = React.useState(false)
  const [showProjectEditForm, setShowProjectEditForm] = React.useState(false)
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null)

  // State for project-content
  const [data, setData] = React.useState<Array<Project>>([])
  const [dataObj, setDataObj] = React.useState<Record<string, Project>>({})

  // Function for handling the changes made in the editor form

  // Effect loads in projects by reading data from the database
  // It does NOT read data from the directory.
  React.useEffect(() => {
    async function setProjectsState() {
      // const projects = await getProjectsArr()
      const obj = await getProjects()
      const projects = Object.values(obj)
      setData(projects)
      setDataObj(obj)
    }
    setProjectsState()
  }, [])

  React.useEffect(() => {
    if (!showProjectEditForm) setSelectedProject(null)
  }, [showProjectEditForm])

  const table = useReactTable({
    data: data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    },
    meta: {
      setShowError,
      handleEditProject
    }
  })

  function handleEditProject(project: Project) {
    setShowProjectEditForm(true)
    setSelectedProject(project)
  }

  function handleProjectUpdate(updatedProject: Project) {
    const id = updatedProject.id
    const updatedProjectsArray: Array<Project> = data.map((projectItem) => {
      if (projectItem.id == updatedProject.id) {
        return updatedProject
      } else {
        return projectItem
      }
    })

    window.api.log({
      level: 'INFO',
      message: 'Updating Project with ID: ' + updatedProject.id
    })

    setData(updatedProjectsArray)
    setDataObj((prev) => ({ ...prev, [updatedProject.id]: updatedProject }))
    setShowProjectEditForm(false)
  }

  return (
    <>
      <Dialog open={showError} onOpenChange={setShowError}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Directory failed to open.</DialogTitle>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <Alert variant="destructive">
              <FolderX />
              <AlertTitle>This directory does not exist</AlertTitle>
              <AlertDescription>
                The project directory could not be found. It may have been deleted or moved.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ProjectEditForm
        project={selectedProject}
        showProjectEditForm={showProjectEditForm}
        setShowProjectEditForm={setShowProjectEditForm}
        onUpdate={handleProjectUpdate}
      />
      <div className="w-full h-full">
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No Projects.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-muted-foreground flex-1 text-sm">
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

// const ProjectsOptionBar = ({ selectedProjects }: { selectedProjects: Array<Project> }) => {
//   return
// }
