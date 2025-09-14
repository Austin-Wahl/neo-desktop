import React, { createContext, useCallback, useEffect, useState } from 'react'

export interface UtilsContextProps {
  fullHeight: boolean
}
export const UtilContext = createContext<UtilsContextProps>({ fullHeight: false })

const UtilsProvider = ({ children }: { children: React.ReactNode }) => {
  // Full Height is a boolean which is used to toggle UI components on MAC OS
  // It returns true if the platform == darwin and the app is fullscreened and false if its either not fullscreened or not a mac
  const [fullHeight, setFullHeight] = useState<boolean>(false)

  const isFullScreen = useCallback(async function isFullScreen() {
    const isFullScreen = await window.api.getWindowState()
    return isFullScreen.isFullScreen
  }, [])

  useEffect(() => {
    // When the page first renders, check if the screen is fullscreen and if we're on macOS
    async function check() {
      const fs = await isFullScreen()
      const isMacOS = window.electron.process.platform == 'darwin'

      if (fs && isMacOS) {
        setFullHeight(true)
      } else {
        setFullHeight(false)
      }
    }
    check()
  }, [])

  useEffect(() => {
    // Add a listener for screen size changes
    window.api.onWindowStateChange((state) => {
      const isFullScreen = state.isFullScreen
      const isMacOS = window.electron.process.platform == 'darwin'

      if (isFullScreen && isMacOS) {
        setFullHeight(true)
      } else {
        setFullHeight(false)
      }
    })
  }, [])

  return <UtilContext.Provider value={{ fullHeight: fullHeight }}>{children}</UtilContext.Provider>
}

export default UtilsProvider
