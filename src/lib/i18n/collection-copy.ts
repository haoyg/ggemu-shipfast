import { esHomeFaqs, esMessages } from './es'
import { ptHomeFaqs, ptMessages } from './pt'

export function getRomanceCollectionCopy(locale: 'es' | 'pt', platform: string) {
  const spanish = locale === 'es'
  const t = spanish ? esMessages : ptMessages
  const name = `${spanish ? 'Juegos' : 'Jogos'} ${platform}`
  return {
    title: `${name} online | POKOPIE`,
    description: spanish ? `Juega a clásicos de ${platform} en tu navegador, sin instalar un emulador.` : `Jogue clássicos de ${platform} no navegador, sem instalar um emulador.`,
    schemaName: name,
    breadcrumbName: name,
    heroTitle: `${name} online`,
    heroDescription: t.home.subtitle,
    ctaLabel: spanish ? 'Ver juegos' : 'Ver jogos',
    libraryTitle: name,
    libraryDescription: (total: number) => `${total} ${spanish ? 'juegos' : 'jogos'}`,
    unavailableMessage: t.home.loadError,
    featuredLabel: t.home.featured,
    coverAlt: spanish ? 'Portada del juego' : 'Capa do jogo',
    articleTitle: t.homeContent.whyTitle,
    articleParagraphs: [t.homeContent.whyBody],
    benefits: t.homeContent.howSteps.map((step) => ({ icon: 'gamepad' as const, title: step.title, body: step.body })),
    genresTitle: t.detail.categories,
    genres: [
      { name: spanish ? 'Acción' : 'Ação', description: spanish ? 'Combate y desafíos de reflejos' : 'Combate e desafios de reflexos', icon: 'gamepad' as const, matchTerms: ['Action'] },
      { name: 'Aventura', description: spanish ? 'Explora mundos y supera desafíos' : 'Explore mundos e supere desafios', icon: 'flag' as const, matchTerms: ['Adventure'] },
      { name: 'Puzzle', description: spanish ? 'Resuelve desafíos de lógica' : 'Resolva desafios de lógica', icon: 'puzzle' as const, matchTerms: ['Puzzle'] },
      { name: spanish ? 'Carreras' : 'Corrida', description: spanish ? 'Velocidad y competición' : 'Velocidade e competição', icon: 'flag' as const, matchTerms: ['Racing'] },
      { name: spanish ? 'Deportes' : 'Esportes', description: spanish ? 'Compite en deportes clásicos' : 'Compita em esportes clássicos', icon: 'trophy' as const, matchTerms: ['Sports', 'Sport'] },
      { name: spanish ? 'Disparos' : 'Tiro', description: spanish ? 'Puntería y acción intensa' : 'Mira e ação intensa', icon: 'rocket' as const, matchTerms: ['Shooter', 'Shoot', 'Shmup'] },
    ],
    faqs: (spanish ? esHomeFaqs : ptHomeFaqs).items,
  }
}
