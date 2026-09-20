import { createFileRoute, notFound } from '@tanstack/react-router'

export const Route = createFileRoute('/best-unblocked-games')({
  beforeLoad: () => {
    throw notFound()
  },
})
