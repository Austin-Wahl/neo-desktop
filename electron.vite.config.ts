import tailwindcss from '@tailwindcss/vite'
import tanstackRouter from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@src': resolve('src')
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@src': resolve('src')
      }
    },
    plugins: [
      tanstackRouter({
        autoCodeSplitting: true,
        routeToken: 'layout',
        target: 'react',
        generatedRouteTree: './src/renderer/src/routeTree.gen.ts',
        routesDirectory: './src/renderer/src/routes'
      }),
      tailwindcss(),
      react()
    ]
  }
})
