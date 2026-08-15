const edgeCacheHeader = 'Cloudflare-CDN-Cache-Control'

export function preventErrorResponseCaching(response: Response) {
  if (response.status < 400 || !response.headers.has(edgeCacheHeader)) {
    return response
  }

  const headers = new Headers(response.headers)

  headers.set('Cache-Control', 'no-store')
  headers.delete(edgeCacheHeader)

  return new Response(response.body, {
    headers,
    status: response.status,
    statusText: response.statusText,
  })
}
