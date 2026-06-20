import path from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import marketQuotesHandler from './api/market-quotes'
import trmHandler from './api/trm'

type LocalApiHandler = (
  req: { method?: string; query?: Record<string, string> },
  res: {
    status: (code: number) => ReturnType<typeof createLocalApiResponse>
    setHeader: (name: string, value: string) => void
    json: (body: unknown) => void
    end: () => void
  },
) => Promise<void>

function createLocalApiResponse(res: ServerResponse) {
  return {
    status(code: number) {
      res.statusCode = code
      return this
    },
    setHeader(name: string, value: string) {
      res.setHeader(name, value)
    },
    json(body: unknown) {
      if (!res.headersSent) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
      }
      res.end(JSON.stringify(body))
    },
    end() {
      res.end()
    },
  }
}

async function runLocalApiHandler(
  handler: LocalApiHandler,
  req: IncomingMessage,
  res: ServerResponse,
  url: URL,
) {
  const query = Object.fromEntries(url.searchParams.entries())
  await handler(
    {
      method: req.method,
      query,
    },
    createLocalApiResponse(res),
  )
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'fil-ontech-local-api',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          const url = new URL(req.url ?? '/', 'http://localhost')

          try {
            if (url.pathname === '/api/market-quotes') {
              await runLocalApiHandler(marketQuotesHandler, req, res, url)
              return
            }

            if (url.pathname === '/api/trm') {
              await runLocalApiHandler(trmHandler, req, res, url)
              return
            }
          } catch {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify({ error: 'Local API failed.' }))
            return
          }

          next()
        })
      },
    },
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
