import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/ps1')({
  beforeLoad: () => {
    throw redirect({ replace: true, to: '/en/ps1-games' })
  },
})
