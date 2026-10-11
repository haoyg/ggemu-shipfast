import { createFileRoute, notFound, redirect } from '@tanstack/react-router'

import { Ps1CompatibilityPage, buildPs1CompatibilityHead } from '#/routes/en.ps1-compatibility'
import { normalizeLocale } from '#/lib/i18n'
import { getSeoOrigin } from '#/lib/seo'

export const Route = createFileRoute('/$locale/ps1-compatibility')({
  beforeLoad: ({ params }) => {
    if (params.locale === 'fr' || params.locale === 'de') throw redirect({ href: '/en/ps1-compatibility', statusCode: 302 })
  },
  loader: async ({ params }) => {
    if (!['zh-CN', 'zh-TW', 'ja', 'ko', 'es', 'pt', 'fr', 'de'].includes(params.locale)) throw notFound()
    return { locale: normalizeLocale(params.locale), origin: await getSeoOrigin() }
  },
  head: ({ loaderData }) => loaderData ? buildPs1CompatibilityHead(loaderData.origin, loaderData.locale) : {},
  component: LocalizedPs1CompatibilityPage,
})

function LocalizedPs1CompatibilityPage() {
  return <Ps1CompatibilityPage locale={Route.useLoaderData().locale} />
}
