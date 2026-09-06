import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import './remixicon-subset.css'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    // Keep intent preloads warm briefly so pointer movement does not trigger
    // duplicate API requests before navigation completes.
    defaultPreloadStaleTime: 30_000,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
