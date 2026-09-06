import { createFileRoute } from '@tanstack/react-router'

import { siteConfig } from '#/lib/site-config'

const GGEMU_API_BASE_URL = 'https://ggemu.com'
const UPSTREAM_TIMEOUT_MS = 3_000

export const Route = createFileRoute('/api/health')({
  server: {
    handlers: {
      GET: getHealthResponse,
    },
  },
})

export async function getHealthResponse() {
  const ggemu = await checkGgemu()

  return Response.json(
    {
      dependencies: { ggemu },
      ok: ggemu.ok,
      service: siteConfig.SITE_NAME,
      status: ggemu.ok ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
    },
    {
      status: ggemu.ok ? 200 : 503,
      headers: { 'Cache-Control': 'no-store' },
    },
  )
}

async function checkGgemu() {
  const startedAt = Date.now()
  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort()
  }, UPSTREAM_TIMEOUT_MS)

  try {
    const response = await fetch(
      `${GGEMU_API_BASE_URL}/api/games/search?${new URLSearchParams({
        limit: '1',
        page: '1',
        play_online: '1',
      })}`,
      {
        headers: {
          Accept: 'application/json',
        },
        signal: controller.signal,
      },
    )

    return {
      latencyMs: Date.now() - startedAt,
      ok: response.ok,
      status: response.status,
    }
  } catch (error) {
    return {
      error: getErrorMessage(error),
      latencyMs: Date.now() - startedAt,
      ok: false,
    }
  } finally {
    clearTimeout(timeoutId)
  }
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Unknown upstream error'
}
