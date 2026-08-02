import type { PublicGame } from '#/lib/ggemu'

export async function createPosterDataUrl({
  cta,
  game,
  url,
}: {
  cta: string
  game: PublicGame
  url: string
}) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) {
    return ''
  }

  canvas.width = 720
  canvas.height = 1080
  drawPosterBackground(context)
  await drawPosterCover(context, game)
  const titleBottom = drawPosterTitle(context, game.name || 'POKOPIE')
  drawPosterKeywords(context, game.keywords, titleBottom + 14)
  drawPosterQrCard(context)
  await drawPosterQr(context, url)
  drawPosterCta(context, cta)

  return canvas.toDataURL('image/png')
}

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

function drawPosterBackground(context: CanvasRenderingContext2D) {
  const gradient = context.createLinearGradient(0, 0, 720, 1080)

  gradient.addColorStop(0, '#0b1020')
  gradient.addColorStop(0.42, '#172554')
  gradient.addColorStop(0.7, '#0f766e')
  gradient.addColorStop(1, '#101827')
  context.fillStyle = gradient
  context.fillRect(0, 0, 720, 1080)

  const glow = context.createRadialGradient(590, 760, 20, 590, 760, 420)

  glow.addColorStop(0, 'rgba(45, 212, 191, 0.38)')
  glow.addColorStop(0.48, 'rgba(45, 212, 191, 0.12)')
  glow.addColorStop(1, 'rgba(45, 212, 191, 0)')
  context.fillStyle = glow
  context.fillRect(0, 0, 720, 1080)

  context.fillStyle = 'rgba(255, 255, 255, 0.08)'
  context.beginPath()
  context.moveTo(0, 650)
  context.lineTo(170, 590)
  context.lineTo(0, 930)
  context.closePath()
  context.fill()
}

async function drawPosterCover(context: CanvasRenderingContext2D, game: PublicGame) {
  const coverUrl = game.game_cover ? getImageProxyUrl(game.game_cover) : ''

  context.save()
  roundedRect(context, 32, 32, 656, 492, 24)
  context.clip()

  if (coverUrl) {
    const cover = await loadImage(coverUrl).catch(() => null)

    if (cover) {
      drawCoverImage(context, cover, 32, 32, 656, 492)
    } else {
      drawPosterCoverFallback(context)
    }
  } else {
    drawPosterCoverFallback(context)
  }

  context.restore()
}

function drawPosterCoverFallback(context: CanvasRenderingContext2D) {
  const fallback = context.createLinearGradient(32, 32, 688, 524)

  fallback.addColorStop(0, '#334155')
  fallback.addColorStop(1, '#0f766e')
  context.fillStyle = fallback
  context.fillRect(32, 32, 656, 492)
}

function drawPosterTitle(context: CanvasRenderingContext2D, title: string) {
  context.font = '800 44px Arial, sans-serif'
  const titleLines = getPosterTitleLines(context, title, 600, 2)

  context.fillStyle = '#ffffff'
  context.textBaseline = 'top'

  titleLines.forEach((line, index) => {
    context.fillText(line, 48, 552 + index * 56, 624)
  })

  return 552 + titleLines.length * 56
}

function drawPosterKeywords(
  context: CanvasRenderingContext2D,
  keywords: string | undefined,
  y: number,
) {
  context.font = '600 22px Arial, sans-serif'
  const lines = getPosterKeywordLines(context, keywords, 640, 2)

  if (lines.length === 0) {
    return
  }

  context.fillStyle = 'rgba(255, 255, 255, 0.72)'
  context.textBaseline = 'top'

  lines.forEach((line, index) => {
    context.fillText(line, 48, y + index * 30, 640)
  })
}

function drawPosterQrCard(context: CanvasRenderingContext2D) {
  context.fillStyle = 'rgba(255, 255, 255, 0.94)'
  roundedRect(context, 226, 722, 268, 268, 28)
  context.fill()
}

async function drawPosterQr(context: CanvasRenderingContext2D, url: string) {
  const { default: QRCode } = await import('qrcode')
  const qrDataUrl = await QRCode.toDataURL(url, {
    errorCorrectionLevel: 'M',
    margin: 1,
    scale: 10,
    type: 'image/png',
    width: 260,
  })
  const qr = await loadImage(qrDataUrl)

  context.drawImage(qr, 246, 742, 228, 228)
}

function drawPosterCta(context: CanvasRenderingContext2D, cta: string) {
  context.fillStyle = '#ffffff'
  context.font = '800 24px Arial, sans-serif'
  const lines = getCenteredTextLines(context, cta, 390)

  context.textAlign = 'center'
  context.textBaseline = 'middle'

  lines.forEach((line, index) => {
    context.fillText(line, 360, 1014 + index * 30, 520)
  })

  context.textAlign = 'start'
}

function getCenteredTextLines(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
) {
  const words = text.includes(' ') ? text.split(' ') : Array.from(text)
  const lines: Array<string> = []
  let line = ''

  for (const word of words) {
    const separator = text.includes(' ') && line ? ' ' : ''
    const nextLine = `${line}${separator}${word}`

    if (context.measureText(nextLine).width <= maxWidth) {
      line = nextLine
      continue
    }

    if (line) {
      lines.push(line)
    }

    line = word
  }

  if (line) {
    lines.push(line)
  }

  return lines.slice(0, 2)
}

function getPosterKeywordLines(
  context: CanvasRenderingContext2D,
  keywords: string | undefined,
  maxWidth: number,
  maxLines: number,
) {
  const text = getKeywordItems(keywords).join(' · ')
  const lines: Array<string> = []
  let line = ''

  if (!text) {
    return lines
  }

  let hasMore = false

  for (let index = 0; index < text.length; index++) {
    const char = text[index]
    const nextLine = `${line}${char}`

    if (context.measureText(nextLine).width <= maxWidth) {
      line = nextLine
      continue
    }

    if (line) {
      lines.push(line)
    }

    if (lines.length === maxLines) {
      hasMore = true
      break
    }

    line = char
  }

  if (line && lines.length < maxLines) {
    lines.push(line)
  }

  if (hasMore && lines.length > 0) {
    lines[lines.length - 1] = truncateTextLine(context, lines[lines.length - 1], maxWidth)
  }

  return lines
}

function truncateTextLine(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
) {
  let truncated = text

  while (truncated && context.measureText(`${truncated}...`).width > maxWidth) {
    truncated = truncated.slice(0, -1)
  }

  return truncated ? `${truncated}...` : ''
}

function drawCoverImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight)
  const sourceWidth = width / scale
  const sourceHeight = height / scale
  const sourceX = (image.naturalWidth - sourceWidth) / 2
  const sourceY = (image.naturalHeight - sourceHeight) / 2

  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height)
}

function roundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath()
  context.moveTo(x + radius, y)
  context.arcTo(x + width, y, x + width, y + height, radius)
  context.arcTo(x + width, y + height, x, y + height, radius)
  context.arcTo(x, y + height, x, y, radius)
  context.arcTo(x, y, x + width, y, radius)
  context.closePath()
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()

    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = src
  })
}

function getImageProxyUrl(url: string) {
  return `/api/share-image?url=${encodeURIComponent(url)}`
}

function getPosterTitleLines(
  context: CanvasRenderingContext2D,
  title: string,
  maxWidth: number,
  maxLines: number,
) {
  const normalized = title.trim()
  const lines: Array<string> = []
  let line = ''

  for (const char of normalized) {
    const nextLine = `${line}${char}`

    if (context.measureText(nextLine).width <= maxWidth) {
      line = nextLine
      continue
    }

    if (line) {
      lines.push(line)
    }

    line = char

    if (lines.length === maxLines) {
      break
    }
  }

  if (line && lines.length < maxLines) {
    lines.push(line)
  }

  if (lines.length === maxLines && lines.join('').length < normalized.length) {
    lines[maxLines - 1] = `${lines[maxLines - 1].slice(0, -1)}...`
  }

  return lines
}
