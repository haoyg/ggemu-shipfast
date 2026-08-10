import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/n64-games')({
  beforeLoad: () => {
    throw redirect({ replace: true, to: '/en/n64-games' })
  },
})
