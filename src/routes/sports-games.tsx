import { createFileRoute, notFound } from '@tanstack/react-router'

export const Route = createFileRoute('/sports-games')({
  beforeLoad: () => {
    throw notFound()
  },
})
