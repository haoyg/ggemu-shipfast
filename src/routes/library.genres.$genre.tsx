import { createFileRoute, notFound } from '@tanstack/react-router'

export const Route = createFileRoute('/library/genres/$genre')({
  beforeLoad: () => {
    throw notFound()
  },
})
