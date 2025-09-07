import StudioLayoutProvider from '@renderer/components/providers/studio-layout-provider'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_studio/studio')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <StudioLayoutProvider>
      <p>Studio Interface</p>
    </StudioLayoutProvider>
  )
}
