const LIBRETRO_PS1_BOX_ART_BASE_URL =
  'https://thumbnails.libretro.com/Sony%20-%20PlayStation/Named_Boxarts/'

export const PS1_COVER_FILE_BY_SLUG = {
  'initial-d-ps1-1998': 'Initial D (Japan).png',
  'harry-potter-and-the-philosopher-s-stone-ps1-2001':
    "Harry Potter and the Philosopher's Stone (Europe) (En,Fr,De).png",
  'crash-bandicoot-2-cortex-strikes-back-ps1-1997':
    'Crash Bandicoot 2 - Cortex Strikes Back (USA).png',
  'grand-theft-auto-2-ps1-1999': 'Grand Theft Auto 2 (USA).png',
  'tekken-3-ps1-1997': 'Tekken 3 (USA).png',
  'grand-theft-auto-ps1-1997': 'Grand Theft Auto (USA).png',
  'jojo-s-bizarre-adventure-ps1-1998': "JoJo's Bizarre Adventure (USA).png",
  'captain-tsubasa-j-get-in-the-tomorrow-ps1-1995':
    'Captain Tsubasa J - Get in the Tomorrow (Japan).png',
  'dead-or-alive-ps1-1998': 'Dead or Alive (USA).png',
  'boku-no-natsuyasumi-ps1-2000':
    'Boku no Natsuyasumi - Summer Holiday 20th Century (Japan).png',
  'disney-s-hercules-ps1-1997': "Disney's Hercules Action Game (USA).png",
  'crash-team-racing-ps1-1999': 'CTR - Crash Team Racing (USA).png',
  'spider-man-ps1-2000': 'Spider-Man (USA).png',
  'spider-man-2-enter-electro-ps1-2001':
    'Spider-Man 2 - Enter - Electro (USA).png',
  'winning-eleven-4-ps1-1999':
    'World Soccer Jikkyou Winning Eleven 4 (Japan).png',
  'resident-evil-3-nemesis-ps1-1999': 'Resident Evil 3 - Nemesis (USA).png',
} as const satisfies Record<string, string>

export function getPs1CoverFallback(urlSlug: string | undefined) {
  const slug = urlSlug?.trim() as keyof typeof PS1_COVER_FILE_BY_SLUG | undefined
  const fileName = slug ? PS1_COVER_FILE_BY_SLUG[slug] : undefined

  if (!fileName) {
    return undefined
  }

  const encodedFileName = encodeURIComponent(fileName).replaceAll("'", '%27')
  return `${LIBRETRO_PS1_BOX_ART_BASE_URL}${encodedFileName}`
}
