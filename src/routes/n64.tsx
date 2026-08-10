import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/n64')({
  beforeLoad: () => {
    throw redirect({ replace: true, to: '/en/n64-games' })
  },
})
