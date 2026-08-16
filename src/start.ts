import { createMiddleware, createStart } from '@tanstack/react-start'

import { getCanonicalHostRedirect } from '#/lib/canonical-host'
import { applyResponseCachePolicy } from '#/lib/response-cache'

const canonicalHostMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    const redirectResponse = getCanonicalHostRedirect(request)

    return redirectResponse ?? next()
  },
)

const responseCacheMiddleware = createMiddleware().server(async ({
  handlerType,
  next,
}) => {
  const result = await next()

  return {
    ...result,
    response: applyResponseCachePolicy(result.response, {
      isServerFn: handlerType === 'serverFn',
    }),
  }
})

export const startInstance = createStart(() => ({
  requestMiddleware: [canonicalHostMiddleware, responseCacheMiddleware],
}))
