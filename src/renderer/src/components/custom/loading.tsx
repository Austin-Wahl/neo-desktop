import grid from '@renderer/assets/grid.svg'
import useUtils from '@renderer/hooks/use-utils'
import { log } from '@src/main/services/logging/logger'
import { ReactNode, useEffect, useState } from 'react'

const Loading = ({ children }: { children: ReactNode }) => {
  const { fullHeight } = useUtils()
  const [isLoading, setIsLoading] = useState(true)
  const [rendererReady, setRendererReady] = useState(false)

  useEffect(() => {
    window.api.onAppReady(() => {
      window.api.log({
        level: 'INFO',
        message: 'Application Init Process Complete. Loading Home.'
      })
      setIsLoading(false)
    })
    if (!rendererReady) {
      window.api.signalRendererReady()
      setRendererReady(true)
    }

    return
  }, [rendererReady])

  if (!isLoading) return children

  return (
    <div className="w-full h-screen relative">
      {window.electron.process.platform === 'darwin' && !fullHeight ? (
        <div
          className="fixed w-full h-[40px] z-[1000] top-0 left-0 flex justify-between items-center"
          style={{ appRegion: 'drag' } as React.CSSProperties & { [key: string]: any }}
        ></div>
      ) : null}
      <div
        className={`z-[100] absolute w-full ${fullHeight ? 'h-[calc(100%-40px)]' : 'mt-0 h-full'}`}
      >
        <div className="container h-full w-full flex flex-col gap-2 iems-center justify-center ml-auto mr-auto">
          <p className="text-sm animate-pulse select-none">Please wait</p>
          <p className="text-5xl select-none">Neo is initializing</p>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full">
        <img src={grid} className="w-full h-full object-cover" />
      </div>
    </div>
  )
}

export default Loading
