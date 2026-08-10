import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/snes')({
  beforeLoad: () => {
    throw redirect({ replace: true, to: '/en/snes-games' })
  },
})
