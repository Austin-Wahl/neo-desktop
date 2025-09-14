import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools as ReactQueryDevtoolsBase } from '@tanstack/react-query-devtools'
import { ThemeProvider } from 'next-themes'
import React from 'react'
import { SidebarProvider } from '../ui/sidebar'
import { Toaster } from '../ui/sonner'
import UtilsProvider from '@renderer/components/providers/utils-provider'
// https://tanstack.com/router/v1/docs/framework/react/devtools
const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : React.lazy(() =>
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools
      }))
    )

const ReactQueryDevtools = import.meta.env.PROD ? () => null : ReactQueryDevtoolsBase

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme={'dark'} enableSystem>
        <UtilsProvider>
          <SidebarProvider>{children}</SidebarProvider>
          <Toaster
            toastOptions={{
              classNames: {
                // !important to override: https://github.com/shadcn-ui/ui/issues/3579
                error: '!border-none !bg-toast-error !text-foreground',
                info: '!border-none !bg-toast-info !text-foreground',
                loading: '!border-none !bg-toast-loading !text-foreground',
                success: '!border-none !bg-toast-success !text-foreground',
                warning: '!border-none !bg-toast-warning !text-foreground'
              }
            }}
          />
          {/* <React.Suspense>
          <TanStackRouterDevtools position="bottom-left" />
          <ReactQueryDevtools buttonPosition="bottom-right" />
        </React.Suspense> */}
        </UtilsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
