import { createFileRoute } from '@tanstack/react-router'

const SHARE_IMAGE_TIMEOUT_MS = 5_000
const MAX_SHARE_IMAGE_BYTES = 5 * 1024 * 1024
const ALLOWED_IMAGE_HOSTS = new Set([
  'pokopie.com',
  'www.pokopie.com',
  'ggemu.com',
  'www.ggemu.com',
  'storage.134x.com',
  'pbs.twimg.com',
])

export const Route = createFileRoute('/api/share-image')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url)
        const imageUrl = getImageUrl(url)

        if (!imageUrl) {
          return new Response('Invalid image request', { status: 400 })
        }

        try {
          const response = await fetchShareImage(imageUrl)
          const finalUrl = new URL(response.url || imageUrl)
          const contentType = response.headers.get('content-type') || ''
          const contentLength = Number(response.headers.get('content-length') || 0)

          if (!isAllowedShareImageUrl(finalUrl)) {
            return new Response('Invalid image redirect', { status: 400 })
          }

          if (!response.ok || !contentType.startsWith('image/')) {
            return new Response('Image not found', { status: 404 })
          }

          if (contentLength > MAX_SHARE_IMAGE_BYTES) {
            return new Response('Image too large', { status: 413 })
          }

          const image = await response.arrayBuffer()

          if (image.byteLength > MAX_SHARE_IMAGE_BYTES) {
            return new Response('Image too large', { status: 413 })
          }

          return new Response(image, {
            headers: {
              'cache-control': 'public, max-age=86400',
              'content-type': contentType,
            },
          })
        } catch {
          return new Response('Image fetch failed', { status: 502 })
        }
      },
    },
  },
})

function fetchShareImage(imageUrl: string) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), SHARE_IMAGE_TIMEOUT_MS)

  return fetch(imageUrl, { signal: controller.signal }).finally(() => {
    clearTimeout(timeout)
  })
}

export function getImageUrl(url: URL) {
  const source = url.searchParams.get('url')

  if (!source) {
    return ''
  }

  try {
    const imageUrl = new URL(source)

    if (!isAllowedShareImageUrl(imageUrl)) {
      return ''
    }

    return imageUrl.toString()
  } catch {
    return ''
  }
}

export function isAllowedShareImageUrl(url: URL) {
  return url.protocol === 'https:' && ALLOWED_IMAGE_HOSTS.has(url.hostname.toLowerCase())
}
