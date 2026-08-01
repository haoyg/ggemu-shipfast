import { createFileRoute, redirect } from '@tanstack/react-router'

type XRedirectSearch = {
  url?: string
}

function validateXRedirectSearch(search: Record<string, unknown>): XRedirectSearch {
  return {
    url: typeof search.url === 'string' ? search.url : undefined,
  }
}

function getSafeXUrl(value: string | undefined) {
  if (!value) {
    return ''
  }

  try {
    const url = new URL(value)

    return url.protocol === 'https:' && url.hostname === 'x.com'
      ? url.toString()
      : ''
  } catch {
    return ''
  }
}

export const Route = createFileRoute('/x')({
  validateSearch: validateXRedirectSearch,
  beforeLoad: ({ search }) => {
    const safeUrl = getSafeXUrl(search.url)

    if (safeUrl) {
      throw redirect({
        href: safeUrl,
        replace: true,
      })
    }

    throw redirect({
      params: { locale: 'zh-CN' },
      replace: true,
      to: '/$locale',
    })
  },
})
