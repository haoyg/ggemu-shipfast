import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/en/snes')({
  beforeLoad: () => {
    throw redirect({ replace: true, statusCode: 301, to: '/en/snes-games' })
  },
})
