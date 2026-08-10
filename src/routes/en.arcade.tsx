import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/en/arcade')({
  beforeLoad: () => {
    throw redirect({ replace: true, to: '/en/arcade-games' })
  },
})
