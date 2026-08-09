import { createFileRoute, redirect } from '@tanstack/react-router'

import { normalizeSiteTemplate } from '#/lib/site-config'

export const Route = createFileRoute('/')({
  validateSearch: (search) => ({
    template: normalizeSiteTemplate(search.template),
  }),
  beforeLoad: ({ search }) => {
    throw redirect({
      params: { locale: 'en' },
      search,
      to: '/$locale',
    })
  },
})
