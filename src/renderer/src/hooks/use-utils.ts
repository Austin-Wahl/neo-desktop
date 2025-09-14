import { UtilContext, UtilsContextProps } from '@renderer/components/providers/utils-provider'
import { useContext } from 'react'

const useUtils = (): UtilsContextProps => {
  const utilsContext = useContext(UtilContext)

  if (!utilsContext) {
    throw new Error("'useUtils' must be called within a UtilProvider.")
  }

  return utilsContext
}

export default useUtils
