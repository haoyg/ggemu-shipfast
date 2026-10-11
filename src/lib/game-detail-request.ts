export class GgemuApiError extends Error {
  constructor(readonly status: number) {
    super(`GGEMU API request failed with ${status}`)
  }
}

export function isMissingGameError(error: unknown) {
  return error instanceof GgemuApiError && (error.status === 404 || error.status === 410)
}

export async function requestGameDetail<T>(load: () => Promise<T>) {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      return { kind: 'ready' as const, value: await load() }
    } catch (error) {
      if (isMissingGameError(error)) return { kind: 'not-found' as const }
      if (error instanceof GgemuApiError && error.status < 500 && error.status !== 429) break
    }
  }
  return { kind: 'temporary-error' as const }
}

// Route headers carry the status through SSR; response middleware consumes this marker.
export const temporaryGameDetailHeaders = {
  'X-POKOPIE-Response-Status': '503',
  'Retry-After': '60',
  'Cache-Control': 'no-store',
} as const
