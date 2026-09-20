import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/arcade')({
  beforeLoad: () => {
    throw redirect({ replace: true, statusCode: 301, to: '/en/arcade-games' })
  },
})
