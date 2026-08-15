import { createMiddleware, createStart } from '@tanstack/react-start'

import { applyResponseCachePolicy } from '#/lib/response-cache'

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
  requestMiddleware: [responseCacheMiddleware],
}))
