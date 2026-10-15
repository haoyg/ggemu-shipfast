import type { BlogPost } from './ggemu'

const publishedAt = '2026-10-15T00:00:00Z'

export const editorialBlogPosts: BlogPost[] = [
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
].map(post => ({ ...post, created_at: publishedAt, updated_at: publishedAt }))

export function isEditorialBlogPost(id: string) {
  return editorialBlogPosts.some(post => post.slug === id)
}

export function prependEditorialBlogPosts(posts: BlogPost[]) {
  return [...editorialBlogPosts, ...posts.filter(post => !isEditorialBlogPost(post.slug ?? ''))]
}
