import { createFileRoute, notFound } from '@tanstack/react-router'

export const Route = createFileRoute('/racing-games')({
  beforeLoad: () => {
    throw notFound()
  },
})
