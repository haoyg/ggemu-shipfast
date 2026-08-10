import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/arcade-games')({
  beforeLoad: () => {
    throw redirect({ replace: true, to: '/en/arcade-games' })
  },
})
