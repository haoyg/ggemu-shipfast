import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/nes')({
  beforeLoad: () => {
    throw redirect({ replace: true, to: '/en/nes-games' })
  },
})
