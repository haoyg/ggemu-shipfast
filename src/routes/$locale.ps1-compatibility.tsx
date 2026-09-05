import { createFileRoute, notFound } from '@tanstack/react-router'

import { Ps1CompatibilityPage, buildPs1CompatibilityHead } from '#/routes/en.ps1-compatibility'
import { normalizeLocale } from '#/lib/i18n'
import { getSeoOrigin } from '#/lib/seo'

export const Route = createFileRoute('/$locale/ps1-compatibility')({
  loader: async ({ params }) => {
    if (params.locale !== 'zh-CN' && params.locale !== 'ja') throw notFound()
    return { locale: normalizeLocale(params.locale), origin: await getSeoOrigin() }
  },
  head: ({ loaderData }) => loaderData ? buildPs1CompatibilityHead(loaderData.origin, loaderData.locale) : {},
  component: LocalizedPs1CompatibilityPage,
})

function LocalizedPs1CompatibilityPage() {
  return <Ps1CompatibilityPage locale={Route.useLoaderData().locale} />
}
