export function getKeywordItems(value?: string) {
  return (
    value
      ?.split(/[,，、;；|/]+/)
      .map((keyword) => keyword.trim())
      .filter(Boolean) ?? []
  )
}

export function getPosterFileName(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'game-poster'
}

