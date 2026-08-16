import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = getRobotsOrigin(request)

        return new Response(buildRobotsTxt(origin), {
          headers: {
            'Cache-Control': 'public, max-age=3600, s-maxage=86400',
            'Content-Type': 'text/plain; charset=utf-8',
          },
        })
      },
    },
  },
})

export function getRobotsOrigin(request: Request) {
  const url = new URL(request.url)

  if (url.hostname === 'pokopie.com' || url.hostname === 'www.pokopie.com') {
    return 'https://pokopie.com'
  }

  return url.origin
}

export function buildRobotsTxt(origin: string) {
  return `User-agent: *
Disallow:
Sitemap: ${origin}/sitemap.xml
`
}
