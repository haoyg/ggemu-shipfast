import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/ps1-compatibility')({
  beforeLoad: () => {
    throw redirect({ replace: true, to: '/en/ps1-compatibility' })
  },
})
