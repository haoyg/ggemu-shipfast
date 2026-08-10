import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/gba')({
  beforeLoad: () => {
    throw redirect({ replace: true, to: '/en/gba-games' })
  },
})
