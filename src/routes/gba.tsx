import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/gba')({
  beforeLoad: () => {
    throw redirect({ replace: true, statusCode: 301, to: '/en/gba-games' })
  },
})
