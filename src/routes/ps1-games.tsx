import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/ps1-games')({
  beforeLoad: () => {
    throw redirect({ replace: true, to: '/en/ps1-games' })
  },
})
