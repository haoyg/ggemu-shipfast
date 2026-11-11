import type { BlogPost } from './ggemu'

const publishedAt = '2026-10-15T00:00:00Z'

export const editorialBlogPosts: BlogPost[] = [
  {
    slug: 'how-to-play-roms-in-browser',
    title: 'How to Play ROMs in a Browser: Controls, Saves and Compatibility',
    excerpt: 'Learn how browser-based retro game players work, how to check controls and saves, and what to verify before starting a long play session.',
  },
  {
    slug: 'murdoku-beginner-solving-guide',
    title: 'How to Solve Murdoku: A Beginner’s Deduction Guide',
    excerpt: 'Learn Murdoku with an original worked example: record candidates, eliminate rows and columns, interpret beside clues and identify who was alone with the victim.',
  },
  {
    slug: 'browser-game-black-screen-no-sound-controls-fix',
    title: 'Browser Game Not Working? Fix Black Screens, Sound and Controls',
    excerpt: 'Troubleshoot browser games step by step: distinguish loading from a frozen screen, restore audio, focus keyboard input and protect saves before resetting.',
  },
  {
    slug: 'two-player-browser-retro-games-guide',
    title: 'Two-Player Retro Games in a Browser: Local Co-op Setup Guide',
    excerpt: 'Choose a two-player retro game, check both control mappings and distinguish same-device co-op from online play before starting a browser gaming session.',
  },
  {
    slug: 'best-contra-games-to-play-online',
    title: 'Best Contra Games to Play Online: NES, SNES & Genesis',
    excerpt: 'Compare Contra on NES, Super Contra, Contra III and Contra: Hard Corps, then choose the right browser game by difficulty, platform and play style.',
    created_at: '2026-11-11T00:00:00Z',
    cover_image_url: 'https://pokopie.com/blog-art/contra-games-guide.jpg',
  },
  {
    slug: 'geometry-dash-advance-controls-levels-practice-guide',
    title: 'Geometry Dash Advance Controls, Levels and Practice Mode Guide',
    excerpt: 'Learn how to check the GBA controls, enter practice mode, understand version-dependent levels and troubleshoot Geometry Dash Advance in a browser.',
    created_at: '2026-11-11T00:00:00Z',
    cover_image_url: 'https://pokopie.com/blog-art/geometry-dash-advance-guide.jpg',
  },
].map(post => ({
  ...post,
  created_at: post.created_at ?? publishedAt,
  updated_at: post.created_at ?? publishedAt,
}))

export function isEditorialBlogPost(id: string) {
  return editorialBlogPosts.some(post => post.slug === id)
}

export function prependEditorialBlogPosts(posts: BlogPost[]) {
  return [...editorialBlogPosts, ...posts.filter(post => !isEditorialBlogPost(post.slug ?? ''))]
}
