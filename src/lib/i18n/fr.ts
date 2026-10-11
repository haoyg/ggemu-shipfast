import { siteConfig } from '#/lib/site-config'
import type { HomeFaqs, I18nMessages } from './types'

export const frMessages = {
  "layout": {
    get copyright() { return `Copyright ${new Date().getUTCFullYear()} ${siteConfig.SITE_NAME}` },
    get disclaimer() { return `Les noms, images et marques des jeux appartiennent à leurs propriétaires. Pour une demande de retrait, contactez ${siteConfig.SITE_EMAIL}.` },
    "games": "Accueil",
    "live": "En direct",
    "explore": "Découvrir",
    "playMyRom": "Jouer à ma ROM",
    "blog": "Blog",
    "about": "À propos",
    "legal": "Informations légales",
    "privacyPolicy": "Confidentialité",
    "termsOfService": "Conditions d’utilisation",
    "copyrightRemoval": "Droits d’auteur et retrait",
    "theme": "Thème",
    "language": "Langue",
    "tagline": "Jeux rétro sur POKOPIE",
    "footer": "Retrouvez des jeux classiques dans votre navigateur. Les titres compatibles ne nécessitent pas d’installation séparée."
  },
  "home": {
    "title": "Jouez à des jeux rétro en ligne",
    "subtitle": "Découvrez NES, SNES, GBA, PS1, arcade et d’autres plateformes. Consultez chaque jeu avant de le lancer dans votre navigateur.",
    "heroSearchHint": "Recherchez un titre, une plateforme ou une série.",
    "browsePopular": "Voir les jeux populaires",
    "discovery": "À découvrir",
    "searchPlaceholder": "Titre, plateforme ou série…",
    "search": "Rechercher",
    "closeSearch": "Fermer la recherche",
    "reset": "Réinitialiser",
    "allPlatforms": "Toutes les plateformes",
    "allCategories": "Tous les genres",
    "newest": "Les plus récents",
    "popular": "Populaires",
    "oldest": "Les plus anciens",
    "nameAsc": "Nom A–Z",
    "sortBy": "Trier par",
    "empty": "Aucun jeu trouvé",
    "previous": "Précédent",
    "next": "Suivant",
    "page": "Page {page} sur {pages}",
    "totalGames": "{total} jeux",
    "views": "Vues",
    "plays": "Parties",
    "details": "Détails",
    "featured": "Jeux rétro dans le navigateur",
    "recentlyPlayed": "Joués récemment",
    "latestBlogPosts": "Derniers articles",
    "latestBlogSubtitle": "Guides et conseils pour jouer aux classiques dans le navigateur.",
    "viewAllBlog": "Voir tous les articles",
    "blogPostFallback": "Article",
    "loadError": "Impossible de charger les jeux. Vérifiez votre connexion et réessayez.",
    "loading": "Chargement des jeux…",
    "retry": "Réessayer"
  },
  "detail": {
    "home": "Jeux",
    "play": "Jouer",
    "playPage": "Jouer dans un nouvel onglet",
    "playPageHint": "Ouvre le lecteur dans un nouvel onglet.",
    "install": "Installer",
    "installUnavailable": "L’installation n’est pas encore disponible. Actualisez la page et réessayez.",
    "installDismissed": "Installation annulée.",
    "installGuideTitle": "Ajouter ce jeu à l’écran d’accueil",
    "installGuideIntro": "Si aucune invite ne s’affiche, utilisez le menu du navigateur.",
    "installGuideIos": "Sur iPhone ou iPad : ouvrez Safari, puis Partager et Sur l’écran d’accueil.",
    "installGuideAndroid": "Sur Android : ouvrez Chrome et choisissez Installer l’application ou Ajouter à l’écran d’accueil dans le menu.",
    "installGuideDesktop": "Sur Chrome ou Edge : utilisez l’icône d’installation ou le menu du navigateur.",
    "installGuideClose": "Compris",
    "share": "Partager",
    "copyFailed": "Échec de la copie. Copiez l’adresse ou le code manuellement.",
    "posterFailed": "Impossible de créer l’affiche. Réessayez.",
    "generatePoster": "Créer une affiche",
    "systemShare": "Partager avec l’appareil",
    "copyEmbedCode": "Copier le code d’intégration",
    "embedCodeCopied": "Code copié.",
    "embedCardTitle": "Intégrer ce jeu",
    "embedCardDescription": "Intégrez le lecteur sur votre site avec un lien vers POKOPIE.",
    "embedCodeLabel": "Code iframe",
    "posterTitle": "Affiche à partager",
    "downloadPoster": "Télécharger l’affiche",
    "posterScanCta": "Scannez pour ouvrir le jeu.",
    "shareUnavailableCopied": "Partage indisponible. Le lien a été copié.",
    "overview": "Présentation",
    "keywords": "Mots-clés",
    "howToPlay": "Comment jouer",
    "details": "Informations sur le jeu",
    "platform": "Plateforme",
    "developer": "Développeur",
    "released": "Année",
    "players": "Joueurs",
    "views": "Vues",
    "plays": "Parties",
    "categories": "Genres",
    "languages": "Langues",
    "noData": "Non disponible",
    "browserReady": "Jouable dans le navigateur",
    "noDownload": "Sans installation séparée",
    "faq": "Questions fréquentes",
    "relatedGames": "Jeux similaires"
  },
  "blog": {
    "title": "Guides de jeux rétro",
    "description": "Découvrez les guides, conseils et articles POKOPIE sur les jeux classiques et leur utilisation dans le navigateur.",
    "subtitle": "Parcourez les articles et trouvez votre prochain jeu.",
    "eyebrow": "Guides de jeux",
    "empty": "Aucun article pour le moment",
    "total": "{total} articles",
    "relatedPosts": "Articles similaires"
  },
  "live": {
    "title": "Jeux en direct",
    "description": "Découvrez les diffusions de jeux rétro et les salons actifs sur POKOPIE. Ouvrez un salon pour regarder le jeu en cours.",
    "subtitle": "Regardez les jeux diffusés en ce moment.",
    "eyebrow": "En direct",
    "empty": "Aucune diffusion en cours",
    "total": "{total} salons en direct",
    "watchLive": "Regarder",
    "playGame": "Jouer",
    "closePlayer": "Fermer la diffusion",
    "previous": "Précédent",
    "next": "Suivant",
    "page": "Page {page} sur {pages}",
    "error": "Impossible de charger les salons. Réessayez plus tard.",
    "retry": "Réessayer"
  },
  "homeSeo": {
    "title": "Jeux rétro en ligne — NES, SNES, GBA | POKOPIE",
    "description": "Découvrez NES, SNES, GBA, PS1, arcade et d’autres plateformes. Consultez chaque jeu avant de le lancer dans votre navigateur.",
    "keywords": "jeux rétro en ligne, NES, SNES, GBA, PS1, arcade"
  },
  "about": {
    "title": "À propos",
    "description": "Découvrez POKOPIE, un catalogue de jeux classiques jouables dans le navigateur."
  },
  "homeContent": {
    "whyTitle": "Retrouver les classiques",
    "whyBody": "Parcourez les plateformes et les genres, puis ouvrez une fiche pour découvrir le jeu, ses commandes et les titres similaires. La compatibilité dépend du jeu et de votre appareil. La langue du site ne change pas automatiquement celle du jeu.",
    "howTitle": "Comment jouer",
    "howSteps": [
      {
        "title": "Choisir un jeu",
        "body": "Recherchez un titre, une plateforme ou une série."
      },
      {
        "title": "Lire la fiche",
        "body": "Consultez la présentation et les commandes avant de jouer."
      },
      {
        "title": "Lancer le lecteur",
        "body": "Cliquez sur Jouer. Utilisez les commandes prises en charge par le lecteur."
      }
    ]
  }
} satisfies I18nMessages

export const frHomeFaqs = {
  "title": "Questions fréquentes",
  "subtitle": "Informations pour jouer dans le navigateur.",
  "items": [
    {
      "question": "Comment lancer un jeu ?",
      "answer": "Cliquez sur Jouer. Utilisez les commandes prises en charge par le lecteur."
    },
    {
      "question": "Le jeu est-il traduit ?",
      "answer": "La langue du site concerne son interface. Les langues du jeu dépendent de la version disponible."
    },
    {
      "question": "Quels appareils sont compatibles ?",
      "answer": "La compatibilité varie selon le jeu. Vérifiez les commandes et les indications du lecteur sur votre appareil."
    }
  ]
} satisfies HomeFaqs
