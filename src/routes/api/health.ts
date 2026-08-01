import { createFileRoute } from '@tanstack/react-router'

import { siteConfig } from '#/lib/site-config'

export const Route = createFileRoute('/api/health')({
  server: {
    handlers: {
      GET: () => {
        return Response.json(
          {
            ok: true,
            service: siteConfig.SITE_NAME,
            timestamp: new Date().toISOString(),
          },
          {
            headers: {
              'Cache-Control': 'no-store',
            },
          },
        )
      },
    },
  },
})
