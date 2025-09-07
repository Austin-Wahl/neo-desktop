import ApplicationMenubar from '@renderer/components/custom/application-menubar'
import { Providers } from '@renderer/components/providers/providers'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import '../assets/global.css'

export const Route = createRootRoute({
  component: () => (
    <Providers>
      <ApplicationMenubar />
      <Outlet />
    </Providers>
  )
})
