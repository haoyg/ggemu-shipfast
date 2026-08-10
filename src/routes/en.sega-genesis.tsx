import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/en/sega-genesis')({
  beforeLoad: () => {
    throw redirect({ replace: true, to: '/en/sega-genesis-games' })
  },
})
