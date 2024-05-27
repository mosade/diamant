import React from 'react'
import ReactDOM from 'react-dom/client'
import { SidePanel } from './SidePanel'
import '@/globals.css'
import { ThemeProvider } from '@/sidepanel/component/ThemeProvider'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <SidePanel />
    </ThemeProvider>
  </React.StrictMode>,
)
