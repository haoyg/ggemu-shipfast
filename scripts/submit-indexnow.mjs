const siteOrigin = 'https://pokopie.com'
const sitemapUrl = `${siteOrigin}/sitemap.xml`
const endpoint = 'https://api.indexnow.org/indexnow'
const key = '25974c722beddc0ec6bd65adc44ef820'
const keyLocation = `${siteOrigin}/${key}.txt`
const requestTimeoutMs = 20_000
const maxAttempts = 3

const argumentsList = process.argv.slice(2)
const fullSiteSubmission = argumentsList.includes('--full')
const unsupportedFlags = argumentsList.filter((argument) => argument.startsWith('--') && argument !== '--full')

if (unsupportedFlags.length > 0) {
  throw new Error(`Unsupported IndexNow option: ${unsupportedFlags.join(', ')}`)
}

const explicitUrls = argumentsList.filter((argument) => argument !== '--full')
const sitemapUrls = fullSiteSubmission
  ? extractSitemapUrls(await fetchTextWithRetry(sitemapUrl))
  : []
const urls = uniqueValidSiteUrls([...sitemapUrls, ...explicitUrls])

if (urls.length === 0) {
  console.log('IndexNow skipped: pass changed URLs, or use --full for an intentional full-site submission.')
  process.exit(0)
}

if (process.env.INDEXNOW_DRY_RUN === '1') {
  console.log(`IndexNow dry run: ${urls.length} URLs are ready for submission.`)
  process.exit(0)
}

if (fullSiteSubmission) {
  for (const urlList of chunk(urls, 10_000)) {
    await submitBatchWithRetry(urlList)
  }
} else {
  for (const url of urls) {
    await submitSingleWithRetry(url)
  }
}

console.log(`IndexNow accepted ${urls.length} changed URL${urls.length === 1 ? '' : 's'}.`)

function extractSitemapUrls(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)]
    .map((match) => decodeXml(match[1]))
}

function uniqueValidSiteUrls(candidates) {
  const urls = new Set()

  for (const candidate of candidates) {
    try {
      const url = new URL(candidate)
      if (url.origin !== siteOrigin || url.protocol !== 'https:') continue
      url.hash = ''
      urls.add(url.toString())
    } catch {
      // Ignore malformed command-line or sitemap entries.
    }
  }

  return [...urls]
}

function decodeXml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
}

function chunk(items, size) {
  const chunks = []
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size))
  }
  return chunks
}

async function fetchTextWithRetry(url) {
  return retry(async () => {
    const response = await fetch(url, {
      headers: { accept: 'application/xml,text/xml;q=0.9,*/*;q=0.1' },
      signal: AbortSignal.timeout(requestTimeoutMs),
    })
    if (!response.ok) {
      throw new Error(`Sitemap request failed with HTTP ${response.status}.`)
    }
    return response.text()
  })
}

async function submitSingleWithRetry(url) {
  const submissionUrl = new URL(endpoint)
  submissionUrl.searchParams.set('url', url)
  submissionUrl.searchParams.set('key', key)
  submissionUrl.searchParams.set('keyLocation', keyLocation)

  await retry(async () => {
    const response = await fetch(submissionUrl, {
      signal: AbortSignal.timeout(requestTimeoutMs),
    })

    if (response.status !== 200 && response.status !== 202) {
      const body = (await response.text()).slice(0, 300)
      throw new Error(`IndexNow returned HTTP ${response.status}${body ? `: ${body}` : '.'}`)
    }
  })
}

async function submitBatchWithRetry(urlList) {
  await retry(async () => {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: new URL(siteOrigin).host,
        key,
        keyLocation,
        urlList,
      }),
      signal: AbortSignal.timeout(requestTimeoutMs),
    })

    if (response.status !== 200 && response.status !== 202) {
      const body = (await response.text()).slice(0, 300)
      throw new Error(`IndexNow returned HTTP ${response.status}${body ? `: ${body}` : '.'}`)
    }
  })
}

async function retry(operation) {
  let lastError

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await operation()
    } catch (error) {
      lastError = error
      if (attempt < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1_000))
      }
    }
  }

  throw lastError
}
