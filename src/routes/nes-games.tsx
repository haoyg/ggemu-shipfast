import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/nes-games')({
  beforeLoad: () => {
    throw redirect({ replace: true, to: '/en/nes-games' })
  },
})
