import { siteConfig } from '#/lib/site-config'
import type { HomeFaqs, I18nMessages } from './types'

export const itMessages = {
  layout: {
    get copyright() { return `Copyright ${new Date().getUTCFullYear()} ${siteConfig.SITE_NAME}` },
    get disclaimer() { return `I nomi, le immagini e i marchi dei giochi appartengono ai rispettivi proprietari. Per una richiesta di rimozione, contatta ${siteConfig.SITE_EMAIL}.` },
    games: 'Home', live: 'In diretta', explore: 'Esplora', playMyRom: 'Gioca la mia ROM', blog: 'Blog', about: 'Chi siamo', legal: 'Informazioni legali', privacyPolicy: 'Privacy', termsOfService: 'Termini di servizio', copyrightRemoval: 'Copyright e rimozione', theme: 'Tema', language: 'Lingua', tagline: 'Giochi retrò su POKOPIE', footer: 'Scopri i giochi classici nel browser. I titoli compatibili non richiedono installazioni separate.',
  },
  home: {
    title: 'Gioca ai giochi retrò online', subtitle: 'Scopri NES, SNES, GBA, PS1, arcade e altre piattaforme. Controlla ogni gioco prima di avviarlo nel browser.', heroSearchHint: 'Cerca un titolo, una piattaforma o una serie.', browsePopular: 'Scopri i giochi popolari', discovery: 'In evidenza', searchPlaceholder: 'Titolo, piattaforma o serie…', search: 'Cerca', closeSearch: 'Chiudi la ricerca', reset: 'Reimposta', allPlatforms: 'Tutte le piattaforme', allCategories: 'Tutti i generi', newest: 'Più recenti', popular: 'Popolari', oldest: 'Più vecchi', nameAsc: 'Nome A–Z', sortBy: 'Ordina per', empty: 'Nessun gioco trovato', previous: 'Precedente', next: 'Successiva', page: 'Pagina {page} di {pages}', totalGames: '{total} giochi', views: 'Visualizzazioni', plays: 'Partite', details: 'Dettagli', featured: 'Giochi retrò nel browser', recentlyPlayed: 'Giocati di recente', latestBlogPosts: 'Ultimi articoli', latestBlogSubtitle: 'Guide e consigli per giocare ai classici nel browser.', viewAllBlog: 'Vedi tutti gli articoli', blogPostFallback: 'Articolo', loadError: 'Impossibile caricare i giochi. Controlla la connessione e riprova.', loading: 'Caricamento dei giochi…', retry: 'Riprova',
  },
  detail: {
    home: 'Giochi', play: 'Gioca', playPage: 'Gioca in una nuova scheda', playPageHint: 'Apre il giocatore in una nuova scheda.', install: 'Installa', installUnavailable: 'L’installazione non è ancora disponibile. Aggiorna la pagina e riprova.', installDismissed: 'Installazione annullata.', installGuideTitle: 'Aggiungi questo gioco alla schermata Home', installGuideIntro: 'Se non appare una richiesta, usa il menu del browser.', installGuideIos: 'Su iPhone o iPad: apri Safari, poi Condividi e Aggiungi alla schermata Home.', installGuideAndroid: 'Su Android: apri Chrome e scegli Installa app o Aggiungi alla schermata Home.', installGuideDesktop: 'Su Chrome o Edge: usa l’icona di installazione o il menu del browser.', installGuideClose: 'Ho capito', share: 'Condividi', copyFailed: 'Copia non riuscita. Copia manualmente l’indirizzo o il codice.', posterFailed: 'Impossibile creare il poster. Riprova.', generatePoster: 'Crea poster', systemShare: 'Condividi con il dispositivo', copyEmbedCode: 'Copia codice di incorporamento', embedCodeCopied: 'Codice copiato.', embedCardTitle: 'Incorpora questo gioco', embedCardDescription: 'Incorpora il giocatore sul tuo sito con un link a POKOPIE.', embedCodeLabel: 'Codice iframe', posterTitle: 'Poster da condividere', downloadPoster: 'Scarica poster', posterScanCta: 'Scansiona per aprire il gioco.', shareUnavailableCopied: 'Condivisione non disponibile. Il link è stato copiato.', overview: 'Panoramica', keywords: 'Parole chiave', howToPlay: 'Come giocare', details: 'Informazioni sul gioco', platform: 'Piattaforma', developer: 'Sviluppatore', released: 'Anno', players: 'Giocatori', views: 'Visualizzazioni', plays: 'Partite', categories: 'Generi', languages: 'Lingue', noData: 'Non disponibile', browserReady: 'Giocabile nel browser', noDownload: 'Nessuna installazione separata', faq: 'Domande frequenti', relatedGames: 'Giochi simili',
  },
  about: { title: 'Chi siamo', description: 'Scopri POKOPIE, un catalogo di giochi classici da giocare nel browser.' },
  blog: { title: 'Guide ai giochi retrò', description: 'Scopri guide, consigli e articoli POKOPIE sui giochi classici e su come giocarli nel browser.', subtitle: 'Sfoglia gli articoli e trova il tuo prossimo gioco.', eyebrow: 'Guide ai giochi', empty: 'Nessun articolo per ora', total: '{total} articoli', relatedPosts: 'Articoli correlati' },
  live: { title: 'Giochi in diretta', description: 'Scopri le dirette di giochi retrò e le stanze attive su POKOPIE.', subtitle: 'Guarda i giochi trasmessi in questo momento.', eyebrow: 'In diretta', empty: 'Nessuna diretta attiva', total: '{total} stanze in diretta', watchLive: 'Guarda', playGame: 'Gioca', closePlayer: 'Chiudi la diretta', previous: 'Precedente', next: 'Successiva', page: 'Pagina {page} di {pages}', error: 'Impossibile caricare le stanze. Riprova più tardi.', retry: 'Riprova' },
  homeSeo: { title: 'Giochi retrò online — NES, SNES, GBA | POKOPIE', description: 'Gioca ai giochi retrò online nel browser. Scopri titoli NES, SNES, GBA, PS1 e arcade senza installare un emulatore separato.', keywords: 'giochi retrò online, giochi NES, giochi SNES, giochi GBA, giochi PS1, giochi arcade' },
  homeContent: {
    whyTitle: 'Riscopri i classici', whyBody: 'Esplora piattaforme e generi, poi apri una scheda per conoscere il gioco, i comandi e i titoli simili. La compatibilità dipende dal gioco e dal dispositivo. La lingua del sito non cambia automaticamente quella del gioco.', howTitle: 'Come giocare', howSteps: [
      { title: 'Scegli un gioco', body: 'Cerca un titolo, una piattaforma o una serie.' },
      { title: 'Leggi la scheda', body: 'Controlla la panoramica e i comandi prima di giocare.' },
      { title: 'Avvia il giocatore', body: 'Premi Gioca e usa i comandi supportati dal giocatore.' },
    ],
  },
} satisfies I18nMessages

export const itHomeFaqs = {
  title: 'Domande frequenti',
  subtitle: 'Informazioni essenziali per giocare su POKOPIE.',
  items: [
    { question: 'Posso giocare direttamente nel browser?', answer: 'Sì. Apri la scheda di un titolo compatibile e premi Gioca. La compatibilità varia in base al gioco e al dispositivo.' },
    { question: 'Devo installare un emulatore?', answer: 'No per i titoli giocabili nel browser. I giochi più grandi possono richiedere più tempo per caricarsi.' },
    { question: 'I giochi funzionano su smartphone?', answer: 'Dipende dal gioco e dai controlli disponibili. Per alcuni titoli è consigliato un computer con tastiera o controller.' },
    { question: 'La lingua del sito cambia la lingua del gioco?', answer: 'No. La lingua del gioco dipende dalla versione disponibile. Controlla le informazioni nella scheda prima di iniziare.' },
  ],
} satisfies HomeFaqs
