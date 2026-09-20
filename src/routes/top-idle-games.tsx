import { createFileRoute, notFound } from '@tanstack/react-router'

export const Route = createFileRoute('/top-idle-games')({
  beforeLoad: () => {
    throw notFound()
  },
})
