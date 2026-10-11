const edgeCacheHeader = 'Cloudflare-CDN-Cache-Control'
const cachePolicyHeaders = [
  'Cache-Control',
  'CDN-Cache-Control',
  edgeCacheHeader,
] as const

type ResponseCacheContext = {
  isServerFn?: boolean
}

export function applyResponseCachePolicy(
  response: Response,
  context: ResponseCacheContext = {},
) {
  if (!context.isServerFn && response.headers.get('X-POKOPIE-Response-Status') === '503') {
    const headers = new Headers(response.headers)
    headers.delete('X-POKOPIE-Response-Status')
    headers.delete(edgeCacheHeader)
    headers.delete('CDN-Cache-Control')
    headers.delete('X-Robots-Tag')
    headers.set('Cache-Control', 'no-store')
    return new Response(response.body, { headers, status: 503 })
  }
  const shouldPreventErrorCaching =
    response.status >= 400 && response.headers.has(edgeCacheHeader)
  const shouldPreventImplicitServerFnCaching =
    context.isServerFn && !hasExplicitCachePolicy(response.headers)

  if (!shouldPreventErrorCaching && !shouldPreventImplicitServerFnCaching) {
    return response
  }

  const headers = new Headers(response.headers)

  headers.set('Cache-Control', 'no-store')

  if (shouldPreventErrorCaching) {
    headers.delete(edgeCacheHeader)
  }

  return new Response(response.body, {
    headers,
    status: response.status,
    statusText: response.statusText,
  })
}

function hasExplicitCachePolicy(headers: Headers) {
  return cachePolicyHeaders.some((header) => headers.has(header))
}
