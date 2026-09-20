import { createFileRoute, notFound } from '@tanstack/react-router'

export const Route = createFileRoute('/puzzle-games')({
  beforeLoad: () => {
    throw notFound()
  },
})
