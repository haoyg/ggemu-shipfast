const canonicalHost = 'pokopie.com'
const legacyHost = `www.${canonicalHost}`

export function getCanonicalHostRedirect(request: Request) {
  const url = new URL(request.url)
  const isCanonicalHost = url.hostname === canonicalHost
  const isLegacyHost = url.hostname === legacyHost
  const isRootPath = url.pathname === '/'

  let visitorProtocol: unknown
  try {
    visitorProtocol = JSON.parse(request.headers.get('cf-visitor') ?? '{}').scheme
  } catch {
    // Fall back to the proxy protocol when visitor metadata is unavailable.
  }
  const forwardedProtocol = visitorProtocol === 'http' || visitorProtocol === 'https'
    ? visitorProtocol
    : request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim()
  const protocol = forwardedProtocol === 'https' || forwardedProtocol === 'http'
    ? `${forwardedProtocol}:`
    : url.protocol
  const needsHttps = isCanonicalHost && protocol !== 'https:'

  if (!isLegacyHost && !(isCanonicalHost && isRootPath) && !needsHttps) {
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
      'Cache-Control': 'no-store',
      'Cloudflare-CDN-Cache-Control': 'no-store',
      Location: url.toString(),
    },
    status: 301,
  })
}


export function getCanonicalOrigin(value: string | URL) {
  const url = new URL(value)
  if (url.hostname === canonicalHost || url.hostname === legacyHost) return `https://${canonicalHost}`
  return url.origin
}
