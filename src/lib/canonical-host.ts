const canonicalHost = 'pokopie.com'
const legacyHost = `www.${canonicalHost}`

export function getCanonicalHostRedirect(request: Request) {
  const url = new URL(request.url)
  const isCanonicalHost = url.hostname === canonicalHost
  const isLegacyHost = url.hostname === legacyHost
  const isRootPath = url.pathname === '/'

  if (!isLegacyHost && !(isCanonicalHost && isRootPath)) {
    return undefined
  }

  url.protocol = 'https:'
  url.hostname = canonicalHost
  url.port = ''

  if (isRootPath) {
    url.pathname = '/en'
  }

  return new Response(null, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Cloudflare-CDN-Cache-Control': 'public, max-age=86400',
      Location: url.toString(),
    },
    status: 301,
  })
}
