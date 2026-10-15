import { expect, it } from 'vitest'
import { Route } from './$locale.blog'

type HeadContext = Parameters<NonNullable<typeof Route.options.head>>[0]

it('keeps blog index metadata out of nested article pages', async () => {
  const head = Route.options.head!
  const context = {
    params: { locale: 'en' },
    loaderData: { seoOrigin: 'https://pokopie.com' },
    matches: [{ routeId: '/$locale/blog' }, { routeId: '/$locale/blog/$blogId' }],
  } as unknown as HeadContext
  expect(await head(context)).toEqual({})
  const indexHead = await head({ ...context, matches: [{ routeId: '/$locale/blog' }] } as unknown as HeadContext)
  expect(indexHead?.links).toContainEqual({ rel: 'canonical', href: 'https://pokopie.com/en/blog' })
})
