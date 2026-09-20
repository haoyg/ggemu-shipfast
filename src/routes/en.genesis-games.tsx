import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/en/genesis-games')({
  beforeLoad: () => {
    throw redirect({ replace: true, statusCode: 301, to: '/en/sega-genesis-games' })
  },
})
