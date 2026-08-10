import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/sega-genesis-games')({
  beforeLoad: () => {
    throw redirect({ replace: true, to: '/en/sega-genesis-games' })
  },
})
