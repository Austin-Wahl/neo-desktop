import { AppSidebar } from '@renderer/components/custom/app-asidebar'
import { SidebarInset } from '@renderer/components/ui/sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_neo')({
  component: () => (
    <>
      <AppSidebar />
      <div className="w-full">
        <SidebarInset>
          <div className="flex flex-1 !h-[calc(100%-40px)] pt-[40px]">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </>
  )
})
