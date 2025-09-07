import { createContext, ReactNode } from 'react'

const StudioLayoutContext = createContext({})

// Studio is built to use a modular UI, meaning users can rearrange how the interface looks.
// To keep track of what views are open, where they are, etc...a Context Provider is utilized.
const StudioLayoutProvider = ({ children }: { children?: ReactNode }) => {
  return <StudioLayoutContext.Provider value={{}}>{children}</StudioLayoutContext.Provider>
}

export default StudioLayoutProvider
