import { frMessages, frHomeFaqs } from './fr'
import { deMessages, deHomeFaqs } from './de'
import { itMessages, itHomeFaqs } from './it'

export function getEuropeanCollectionCopy(locale: 'fr' | 'de' | 'it', platform: string) {
  const french = locale === 'fr'
  const italian = locale === 'it'
  const t = french ? frMessages : italian ? itMessages : deMessages
  const name = french ? `Jeux ${platform}` : italian ? `Giochi ${platform}` : `${platform}-Spiele`
  return {
    title: `${name} ${french ? 'en ligne' : 'online'} | POKOPIE`,
    description: french ? `Découvrez les jeux ${platform} sur POKOPIE. Consultez les fiches, les commandes et la compatibilité avant de lancer un titre dans le navigateur.` : italian ? `Scopri i giochi ${platform} su POKOPIE. Consulta le informazioni, i comandi e la compatibilità prima di avviare un titolo nel browser.` : `Entdecke ${platform}-Spiele auf POKOPIE. Lies Spielinformationen, Steuerung und Kompatibilität, bevor du einen Titel im Browser startest.`,
    schemaName: name, breadcrumbName: name, heroTitle: name, heroDescription: t.home.subtitle,
    ctaLabel: t.home.browsePopular, libraryTitle: name,
    libraryDescription: (total: number) => `${total} ${french ? 'jeux' : italian ? 'giochi' : 'Spiele'}`,
    unavailableMessage: t.home.loadError, featuredLabel: t.home.featured,
    coverAlt: french ? 'Illustration du jeu' : italian ? 'Copertina del gioco' : 'Spielcover',
    articleTitle: t.homeContent.whyTitle, articleParagraphs: [t.homeContent.whyBody],
    benefits: t.homeContent.howSteps.map(step => ({ icon: 'gamepad' as const, title: step.title, body: step.body })),
    genresTitle: t.detail.categories,
    genres: [
      { name: french ? 'Action' : 'Action', description: french ? 'Défis et réflexes' : 'Herausforderungen und Reaktion', icon: 'gamepad' as const, matchTerms: ['Action'] },
      { name: french ? 'Aventure' : italian ? 'Avventura' : 'Abenteuer', description: french ? 'Exploration et découvertes' : italian ? 'Esplorazione e scoperte' : 'Erkunden und entdecken', icon: 'flag' as const, matchTerms: ['Adventure'] },
      { name: french ? 'Réflexion' : italian ? 'Rompicapo' : 'Rätsel', description: french ? 'Défis de logique' : italian ? 'Sfide di logica' : 'Logikaufgaben', icon: 'puzzle' as const, matchTerms: ['Puzzle'] },
      { name: french ? 'Course' : italian ? 'Corse' : 'Rennen', description: french ? 'Vitesse et compétition' : italian ? 'Velocità e competizione' : 'Tempo und Wettbewerb', icon: 'flag' as const, matchTerms: ['Racing'] },
    ],
    faqs: (french ? frHomeFaqs : italian ? itHomeFaqs : deHomeFaqs).items,
  }
}
