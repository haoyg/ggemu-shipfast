const canonicalHost = 'pokopie.com'
const legacyHost = `www.${canonicalHost}`

export function getCanonicalHostRedirect(request: Request) {
  const url = new URL(request.url)

  if (url.hostname !== legacyHost) {
    return undefined
  }

  url.protocol = 'https:'
  url.hostname = canonicalHost
  url.port = ''

  return new Response(null, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Cloudflare-CDN-Cache-Control': 'public, max-age=86400',
      Location: url.toString(),
    },
    status: 308,
  })
}
