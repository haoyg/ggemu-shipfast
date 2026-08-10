import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/arcade')({
  beforeLoad: () => {
    throw redirect({ replace: true, to: '/en/arcade-games' })
  },
})
