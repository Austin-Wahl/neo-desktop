import { Avatar, AvatarFallback } from '@renderer/components/ui/avatar'
import { Button } from '@renderer/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@renderer/components/ui/dropdown-menu'
import { Skeleton } from '@renderer/components/ui/skeleton'
import { id } from 'date-fns/locale'
import { Folder, MoreHorizontal, Settings, Trash } from 'lucide-react'
import { PuffLoader } from 'react-spinners'

const ProjectCard = () => {
  return (
    <>
      <Card
        // key={id}
        className={`group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-200 hover:border-border hover:bg-card/80 min-w-[150px] hover:shadow-lg w-full sm:max-w-[200px] sm:aspect-video ${
          status === 'pending' ? 'animate-pulse cursor-progress' : ''
        }`}
        style={{ pointerEvents: status === 'pending' ? 'none' : 'auto' }}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Avatar>
                  <AvatarFallback>
                    <Skeleton />
                  </AvatarFallback>
                  {/* <AvatarImage src={icon} /> */}
                </Avatar>
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
                  {/* {name} */}
                </CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    {/* {updatedAtLocal} */}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-muted"
                    style={{ pointerEvents: 'auto' }} // Ensure this button always works
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      window.location.href = `/project/${id}`
                    }}
                  >
                    <Folder />
                    Open Project
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      window.location.href = `/project/${id}/settings`
                    }}
                  >
                    <Settings />
                    Open Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive cursor-pointer"
                    onSelect={() => {
                      //   setDialogOpen(true)
                    }}
                    disabled={status === 'pending'}
                  >
                    {status === 'pending' ? (
                      <PuffLoader size={16} color={'var(--destructive)'} />
                    ) : (
                      <Trash color="var(--destructive)" />
                    )}
                    Delete Project
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2"></CardDescription>
        </CardContent>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </Card>
    </>
  )
}

export default ProjectCard
