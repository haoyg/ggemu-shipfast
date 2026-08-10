import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/en/ps1')({
  beforeLoad: () => {
    throw redirect({ replace: true, to: '/en/ps1-games' })
  },
})
