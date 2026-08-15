import { createMiddleware, createStart } from '@tanstack/react-start'

import { preventErrorResponseCaching } from '#/lib/response-cache'

const responseCacheMiddleware = createMiddleware().server(async ({ next }) => {
  const result = await next()

  return {
    ...result,
    response: preventErrorResponseCaching(result.response),
  }
})

export const startInstance = createStart(() => ({
  requestMiddleware: [responseCacheMiddleware],
}))
