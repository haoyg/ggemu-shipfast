import { createFileRoute, notFound } from '@tanstack/react-router'

export const Route = createFileRoute('/fun-quiz')({
  beforeLoad: () => {
    throw notFound()
  },
})
