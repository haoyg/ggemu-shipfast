import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/playstation')({
  beforeLoad: () => {
    throw redirect({ replace: true, to: '/en/ps1-games' })
  },
})
