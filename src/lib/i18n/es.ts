import { siteConfig } from '#/lib/site-config'
import type { HomeFaqs, I18nMessages } from './types'

export const esMessages = {
  "layout": {
    get copyright() { return `Copyright ${new Date().getUTCFullYear()} ${siteConfig.SITE_NAME}` },
    get disclaimer() { return `Los nombres, imágenes, marcas y materiales de los juegos pertenecen a sus respectivos titulares. Puedes solicitar una revisión o retirada mediante el proceso de derechos de autor o escribiendo a ${siteConfig.SITE_EMAIL}.` },
    "games": "Inicio",
    "live": "En directo",
    "explore": "Explorar",
    "playMyRom": "Jugar mi ROM",
    "blog": "Blog",
    "about": "Acerca de",
    "legal": "Información legal",
    "privacyPolicy": "Política de privacidad",
    "termsOfService": "Condiciones de uso",
    "copyrightRemoval": "Derechos de autor y retirada",
    "theme": "Tema",
    "language": "Idioma",
    "tagline": "Juega a juegos retro en POKOPIE",
    "footer": "Juega a clásicos retro directamente en tu navegador, sin instalar nada."
  },
  "home": {
    "title": "Juegos retro online — sin descargas",
    "subtitle": "Explora clásicos de NES, SNES, GBA, PS1, arcade, Sega Genesis y más. Empieza en tu navegador, sin instalaciones ni registro.",
    "heroSearchHint": "Busca por título, plataforma o saga.",
    "browsePopular": "Ver juegos populares",
    "discovery": "Más por descubrir",
    "searchPlaceholder": "Busca un juego, una plataforma o una saga…",
    "search": "Buscar",
    "closeSearch": "Cerrar búsqueda",
    "reset": "Restablecer",
    "allPlatforms": "Todas las plataformas",
    "allCategories": "Todos los géneros",
    "newest": "Más recientes",
    "popular": "Populares",
    "oldest": "Más antiguos",
    "nameAsc": "Nombre A–Z",
    "sortBy": "Ordenar por",
    "empty": "No se encontraron juegos",
    "previous": "Anterior",
    "next": "Siguiente",
    "page": "Página {page} de {pages}",
    "totalGames": "{total} juegos",
    "views": "Visitas",
    "plays": "Partidas",
    "details": "Detalles",
    "featured": "Juegos retro en el navegador",
    "recentlyPlayed": "Jugados recientemente",
    "latestBlogPosts": "Últimas publicaciones",
    "latestBlogSubtitle": "Guías de juegos, consejos para jugar en el navegador y artículos sobre juegos retro.",
    "viewAllBlog": "Ver publicaciones",
    "blogPostFallback": "Publicación del blog",
    "loadError": "No se pudieron cargar los juegos. Comprueba tu conexión e inténtalo de nuevo.",
    "loading": "Cargando juegos…",
    "retry": "Reintentar"
  },
  "homeSeo": {
    "title": "Juegos retro online gratis — NES, SNES, GBA | POKOPIE",
    "description": "Juega a clásicos de NES, SNES, GBA, PS1 y arcade gratis en tu navegador. Sin descargas ni registro: descubre tu próximo juego en POKOPIE.",
    "keywords": "juegos retro online, juegos NES, juegos SNES, juegos GBA, juegos PS1, juegos arcade"
  },
  "homeContent": {
    "whyTitle": "¿Por qué jugar a juegos retro online?",
    "whyBody": "POKOPIE reúne clásicos para jugar sin instalar un emulador ni crear una cuenta. Abre la página del juego y pulsa el botón de jugar para cargarlo en el navegador. Explora NES, SNES, Game Boy Advance, PlayStation, arcade, Sega Genesis y Nintendo 64, o busca por nombre. Cada página incluye información de la plataforma, instrucciones, juegos relacionados y opciones para compartir. La compatibilidad y los controles dependen del juego, del dispositivo y del reproductor.",
    "howTitle": "Cómo jugar",
    "howSteps": [
      {
        "title": "Elige un juego",
        "body": "Busca por nombre o explora las plataformas disponibles."
      },
      {
        "title": "Abre la página del juego",
        "body": "Consulta la información y pulsa Jugar ahora."
      },
      {
        "title": "Empieza en el navegador",
        "body": "Usa el teclado, los controles táctiles o un mando cuando el juego los admita."
      }
    ]
  },
  "detail": {
    "home": "Juegos",
    "play": "Jugar ahora",
    "playPage": "Jugar en otra pestaña",
    "playPageHint": "Abre el juego en una nueva pestaña del navegador.",
    "install": "Instalar",
    "installUnavailable": "La instalación aún se está preparando. Si no aparece el aviso, actualiza esta página e inténtalo de nuevo.",
    "installDismissed": "Se canceló la instalación.",
    "installGuideTitle": "Añadir este juego a la pantalla de inicio",
    "installGuideIntro": "Tu navegador no mostró el aviso de instalación. Puedes añadir el juego manualmente.",
    "installGuideIos": "iPhone o iPad: abre esta página en Safari, pulsa Compartir y elige Añadir a pantalla de inicio.",
    "installGuideAndroid": "Android: abre esta página en Chrome y elige Instalar aplicación o Añadir a pantalla de inicio en el menú.",
    "installGuideDesktop": "Chrome o Edge en ordenador: usa el icono de instalación de la barra de direcciones o la opción Instalar aplicación del menú.",
    "installGuideClose": "Entendido",
    "share": "Compartir",
    "copyFailed": "No se pudo copiar. Copia la dirección de la página o selecciona el código de inserción manualmente.",
    "posterFailed": "No se pudo crear la imagen. Inténtalo de nuevo.",
    "generatePoster": "Crear imagen para compartir",
    "systemShare": "Compartir desde el dispositivo",
    "copyEmbedCode": "Copiar código de inserción",
    "embedCodeCopied": "Código de inserción copiado.",
    "embedCardTitle": "Insertar este juego",
    "embedCardDescription": "Añade este juego a otra web con un enlace a POKOPIE.",
    "embedCodeLabel": "Código iframe",
    "posterTitle": "Imagen para compartir",
    "downloadPoster": "Descargar imagen",
    "posterScanCta": "Escanea para jugar, sin instalar nada.",
    "shareUnavailableCopied": "La opción de compartir no está disponible; se ha copiado el enlace.",
    "overview": "Descripción",
    "keywords": "Palabras clave",
    "howToPlay": "Cómo jugar",
    "details": "Información del juego",
    "platform": "Plataforma",
    "developer": "Desarrollador",
    "released": "Lanzamiento",
    "players": "Jugadores",
    "views": "Visitas",
    "plays": "Partidas",
    "categories": "Géneros",
    "languages": "Idiomas del juego",
    "noData": "Sin información",
    "browserReady": "Juega en el navegador",
    "noDownload": "Sin descargas",
    "faq": "Preguntas frecuentes",
    "relatedGames": "Juegos relacionados"
  },
  "about": {
    "title": "Acerca de POKOPIE",
    "description": "POKOPIE es una web para jugar a clásicos retro en el navegador."
  },
  "blog": {
    "title": "Guías de juegos retro y consejos de emulación",
    "description": "Descubre guías de juegos retro, consejos de emulación en el navegador e instrucciones para disfrutar de los clásicos.",
    "subtitle": "Guías prácticas, consejos para jugar en el navegador e historias de videojuegos clásicos.",
    "eyebrow": "Guías de juegos retro",
    "empty": "Todavía no hay publicaciones",
    "total": "{total} publicaciones",
    "relatedPosts": "Publicaciones relacionadas"
  },
  "live": {
    "title": "Juegos en directo",
    "description": "Descubre juegos clásicos y salas que están transmitiendo ahora.",
    "subtitle": "Mira qué juegos clásicos se están transmitiendo y descubre tu próximo juego.",
    "eyebrow": "En directo ahora",
    "empty": "No hay partidas en directo ahora",
    "total": "{total} salas en directo",
    "watchLive": "Ver directo",
    "playGame": "Jugar",
    "closePlayer": "Cerrar directo",
    "previous": "Anterior",
    "next": "Siguiente",
    "page": "Página {page} de {pages}",
    "error": "No se pudieron cargar los directos. Inténtalo más tarde.",
    "retry": "Reintentar"
  }
} satisfies I18nMessages

export const esHomeFaqs = {
  "title": "Preguntas frecuentes",
  "subtitle": "Respuestas sobre juegos, plataformas y controles.",
  "items": [
    {
      "question": "¿Puedo jugar a juegos retro online?",
      "answer": "Abre la página del juego y pulsa Jugar ahora para cargarlo en el navegador."
    },
    {
      "question": "¿Tengo que instalar un emulador?",
      "answer": "No necesitas instalar un emulador por separado. El navegador carga los datos del juego."
    },
    {
      "question": "¿Qué plataformas hay?",
      "answer": "Puedes explorar NES, SNES, GBA, PS1, N64, arcade, Sega Genesis y otras plataformas con los filtros."
    },
    {
      "question": "¿Puedo jugar desde el móvil?",
      "answer": "Usa un navegador moderno. Los controles táctiles y la compatibilidad dependen del juego y del dispositivo."
    },
    {
      "question": "¿Cómo encuentro un juego?",
      "answer": "Busca por su título original, saga o plataforma. El nombre puede variar entre regiones."
    }
  ]
} satisfies HomeFaqs
export const esBlogFaqs = esHomeFaqs
