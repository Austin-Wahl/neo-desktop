import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './assets/global.css'
import { Providers } from '@renderer/components/providers/providers'

function SplashScreen() {
  return (
    <div
      style={{ appRegion: 'drag' } as React.CSSProperties & { [key: string]: any }}
      className="bg-background flex flex-col items-center justify-center p-8"
    >
      <div className="spinner"></div>
      <h1 className="title">Loading Neo...</h1>
      <p className="subtitle">Please wait</p>
    </div>
  )
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <Providers>
        <SplashScreen />
      </Providers>
    </StrictMode>
  )
} else {
  console.error('Splash screen root element not found!')
}
