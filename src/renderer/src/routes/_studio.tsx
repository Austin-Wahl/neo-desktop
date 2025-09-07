import { StudioSidebar } from '@renderer/components/custom/studio-sidebar'
import { SidebarInset } from '@renderer/components/ui/sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_studio')({
  component: () => (
    <>
      <StudioSidebar />
      <div className="w-full !h-[calc(100%-40px)] mt-[40px]">
        <SidebarInset>
          <div className="flex flex-1">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </>
  )
})
