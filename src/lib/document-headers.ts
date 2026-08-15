const browserCacheControl = 'no-cache, no-store, must-revalidate'
const edgeCacheControl = 'public, max-age=300, stale-while-revalidate=86400'

const sharedDocumentHeaders = {
  'Cache-Control': browserCacheControl,
  'Cloudflare-CDN-Cache-Control': edgeCacheControl,
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-DNS-Prefetch-Control': 'on',
  'X-Permitted-Cross-Domain-Policies': 'none',
} as const

const protectedDocumentHeaders = {
  ...sharedDocumentHeaders,
  'Content-Security-Policy': "frame-ancestors 'self'",
  'X-Frame-Options': 'SAMEORIGIN',
} as const

export function getDocumentHeaders(
  isEmbeddable: false,
): typeof protectedDocumentHeaders
export function getDocumentHeaders(isEmbeddable: true): typeof sharedDocumentHeaders
export function getDocumentHeaders(
  isEmbeddable: boolean,
): typeof protectedDocumentHeaders | typeof sharedDocumentHeaders
export function getDocumentHeaders(isEmbeddable: boolean) {
  return isEmbeddable ? sharedDocumentHeaders : protectedDocumentHeaders
}
