import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/en/gba')({
  beforeLoad: () => {
    throw redirect({ replace: true, statusCode: 301, to: '/en/gba-games' })
  },
})
