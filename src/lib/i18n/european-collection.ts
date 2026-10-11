import { frMessages, frHomeFaqs } from './fr'
import { deMessages, deHomeFaqs } from './de'

export function getEuropeanCollectionCopy(locale: 'fr' | 'de', platform: string) {
  const french = locale === 'fr'
  const t = french ? frMessages : deMessages
  const name = french ? `Jeux ${platform}` : `${platform}-Spiele`
  return {
    title: `${name} ${french ? 'en ligne' : 'online'} | POKOPIE`,
    description: french ? `Découvrez les jeux ${platform} sur POKOPIE. Consultez les fiches, les commandes et la compatibilité avant de lancer un titre dans le navigateur.` : `Entdecke ${platform}-Spiele auf POKOPIE. Lies Spielinformationen, Steuerung und Kompatibilität, bevor du einen Titel im Browser startest.`,
    schemaName: name, breadcrumbName: name, heroTitle: name, heroDescription: t.home.subtitle,
    ctaLabel: t.home.browsePopular, libraryTitle: name,
    libraryDescription: (total: number) => `${total} ${french ? 'jeux' : 'Spiele'}`,
    unavailableMessage: t.home.loadError, featuredLabel: t.home.featured,
    coverAlt: french ? 'Illustration du jeu' : 'Spielcover',
    articleTitle: t.homeContent.whyTitle, articleParagraphs: [t.homeContent.whyBody],
    benefits: t.homeContent.howSteps.map(step => ({ icon: 'gamepad' as const, title: step.title, body: step.body })),
    genresTitle: t.detail.categories,
    genres: [
      { name: french ? 'Action' : 'Action', description: french ? 'Défis et réflexes' : 'Herausforderungen und Reaktion', icon: 'gamepad' as const, matchTerms: ['Action'] },
      { name: french ? 'Aventure' : 'Abenteuer', description: french ? 'Exploration et découvertes' : 'Erkunden und entdecken', icon: 'flag' as const, matchTerms: ['Adventure'] },
      { name: french ? 'Réflexion' : 'Rätsel', description: french ? 'Défis de logique' : 'Logikaufgaben', icon: 'puzzle' as const, matchTerms: ['Puzzle'] },
      { name: french ? 'Course' : 'Rennen', description: french ? 'Vitesse et compétition' : 'Tempo und Wettbewerb', icon: 'flag' as const, matchTerms: ['Racing'] },
    ],
    faqs: (french ? frHomeFaqs : deHomeFaqs).items,
  }
}
