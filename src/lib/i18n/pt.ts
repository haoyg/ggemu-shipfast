import { siteConfig } from '#/lib/site-config'
import type { HomeFaqs, I18nMessages } from './types'

export const ptMessages = {
  "layout": {
    get copyright() { return `Copyright ${new Date().getUTCFullYear()} ${siteConfig.SITE_NAME}` },
    get disclaimer() { return `Os nomes, imagens, marcas e materiais dos jogos pertencem aos respectivos titulares. Você pode solicitar uma revisão ou remoção pelo processo de direitos autorais ou escrevendo para ${siteConfig.SITE_EMAIL}.` },
    "games": "Início",
    "live": "Ao vivo",
    "explore": "Explorar",
    "playMyRom": "Jogar minha ROM",
    "blog": "Blog",
    "about": "Sobre",
    "legal": "Informações legais",
    "privacyPolicy": "Política de privacidade",
    "termsOfService": "Termos de uso",
    "copyrightRemoval": "Direitos autorais e remoção",
    "theme": "Tema",
    "language": "Idioma",
    "tagline": "Jogue jogos retrô no POKOPIE",
    "footer": "Jogue clássicos retrô diretamente no navegador, sem instalar nada."
  },
  "home": {
    "title": "Jogos retrô online — sem downloads",
    "subtitle": "Explore clássicos de NES, SNES, GBA, PS1, arcade, Sega Genesis e outras plataformas. Comece no navegador, sem instalações nem cadastro.",
    "heroSearchHint": "Busque por título, plataforma ou série.",
    "browsePopular": "Ver jogos populares",
    "discovery": "Mais para explorar",
    "searchPlaceholder": "Busque um jogo, uma plataforma ou uma série…",
    "search": "Buscar",
    "closeSearch": "Fechar busca",
    "reset": "Limpar filtros",
    "allPlatforms": "Todas as plataformas",
    "allCategories": "Todos os gêneros",
    "newest": "Mais recentes",
    "popular": "Populares",
    "oldest": "Mais antigos",
    "nameAsc": "Nome A–Z",
    "sortBy": "Ordenar por",
    "empty": "Nenhum jogo encontrado",
    "previous": "Anterior",
    "next": "Próximo",
    "page": "Página {page} de {pages}",
    "totalGames": "{total} jogos",
    "views": "Visualizações",
    "plays": "Partidas",
    "details": "Detalhes",
    "featured": "Jogos retrô no navegador",
    "recentlyPlayed": "Jogados recentemente",
    "latestBlogPosts": "Últimas publicações",
    "latestBlogSubtitle": "Guias de jogos, dicas para jogar no navegador e artigos sobre jogos retrô.",
    "viewAllBlog": "Ver publicações",
    "blogPostFallback": "Publicação do blog",
    "loadError": "Não foi possível carregar os jogos. Verifique sua conexão e tente novamente.",
    "loading": "Carregando jogos…",
    "retry": "Tentar novamente"
  },
  "homeSeo": {
    "title": "Jogos retrô online grátis — NES, SNES, GBA | POKOPIE",
    "description": "Jogue clássicos de NES, SNES, GBA, PS1 e arcade grátis no navegador. Sem downloads nem cadastro: descubra seu próximo jogo no POKOPIE.",
    "keywords": "jogos retrô online, jogos NES, jogos SNES, jogos GBA, jogos PS1, jogos arcade"
  },
  "homeContent": {
    "whyTitle": "Por que jogar jogos retrô online?",
    "whyBody": "O POKOPIE reúne clássicos para jogar sem instalar um emulador nem criar uma conta. Abra a página do jogo e pressione o botão de jogar para carregá-lo no navegador. Explore NES, SNES, Game Boy Advance, PlayStation, arcade, Sega Genesis e Nintendo 64, ou busque pelo nome. Cada página inclui informações da plataforma, instruções, jogos relacionados e opções de compartilhamento. A compatibilidade e os controles dependem do jogo, do dispositivo e do player.",
    "howTitle": "Como jogar",
    "howSteps": [
      {
        "title": "Escolha um jogo",
        "body": "Busque pelo nome ou explore as plataformas disponíveis."
      },
      {
        "title": "Abra a página do jogo",
        "body": "Confira as informações e pressione Jogar agora."
      },
      {
        "title": "Comece no navegador",
        "body": "Use o teclado, os controles de toque ou um controle quando o jogo oferecer suporte."
      }
    ]
  },
  "detail": {
    "home": "Jogos",
    "play": "Jogar agora",
    "playPage": "Jogar em outra aba",
    "playPageHint": "Abre o jogo em uma nova aba do navegador.",
    "install": "Instalar",
    "installUnavailable": "A instalação ainda está sendo preparada. Se o aviso não aparecer, atualize a página e tente novamente.",
    "installDismissed": "A instalação foi cancelada.",
    "installGuideTitle": "Adicionar este jogo à tela inicial",
    "installGuideIntro": "Seu navegador não exibiu o aviso de instalação. Você pode adicionar o jogo manualmente.",
    "installGuideIos": "iPhone ou iPad: abra esta página no Safari, toque em Compartilhar e escolha Adicionar à Tela de Início.",
    "installGuideAndroid": "Android: abra esta página no Chrome e escolha Instalar aplicativo ou Adicionar à tela inicial no menu.",
    "installGuideDesktop": "Chrome ou Edge no computador: use o ícone de instalação na barra de endereços ou a opção Instalar aplicativo do menu.",
    "installGuideClose": "Entendi",
    "share": "Compartilhar",
    "copyFailed": "Não foi possível copiar. Copie o endereço da página ou selecione o código de incorporação manualmente.",
    "posterFailed": "Não foi possível criar a imagem. Tente novamente.",
    "generatePoster": "Criar imagem para compartilhar",
    "systemShare": "Compartilhar pelo dispositivo",
    "copyEmbedCode": "Copiar código de incorporação",
    "embedCodeCopied": "Código de incorporação copiado.",
    "embedCardTitle": "Incorporar este jogo",
    "embedCardDescription": "Adicione este jogo a outro site com um link para o POKOPIE.",
    "embedCodeLabel": "Código iframe",
    "posterTitle": "Imagem para compartilhar",
    "downloadPoster": "Baixar imagem",
    "posterScanCta": "Escaneie para jogar, sem instalar nada.",
    "shareUnavailableCopied": "O compartilhamento não está disponível; o link foi copiado.",
    "overview": "Descrição",
    "keywords": "Palavras-chave",
    "howToPlay": "Como jogar",
    "details": "Informações do jogo",
    "platform": "Plataforma",
    "developer": "Desenvolvedor",
    "released": "Lançamento",
    "players": "Jogadores",
    "views": "Visualizações",
    "plays": "Partidas",
    "categories": "Gêneros",
    "languages": "Idiomas do jogo",
    "noData": "Sem informações",
    "browserReady": "Jogue no navegador",
    "noDownload": "Sem downloads",
    "faq": "Perguntas frequentes",
    "relatedGames": "Jogos relacionados"
  },
  "about": {
    "title": "Sobre o POKOPIE",
    "description": "O POKOPIE é um site para jogar clássicos retrô no navegador."
  },
  "blog": {
    "title": "Guias de jogos retrô e dicas de emulação",
    "description": "Descubra guias de jogos retrô, dicas de emulação no navegador e instruções para aproveitar os clássicos.",
    "subtitle": "Guias práticos, dicas para jogar no navegador e histórias de jogos clássicos.",
    "eyebrow": "Guias de jogos retrô",
    "empty": "Ainda não há publicações",
    "total": "{total} publicações",
    "relatedPosts": "Publicações relacionadas"
  },
  "live": {
    "title": "Jogos ao vivo",
    "description": "Descubra jogos clássicos e salas que estão transmitindo agora.",
    "subtitle": "Veja quais jogos clássicos estão sendo transmitidos e descubra seu próximo jogo.",
    "eyebrow": "Ao vivo agora",
    "empty": "Nenhuma partida ao vivo no momento",
    "total": "{total} salas ao vivo",
    "watchLive": "Assistir ao vivo",
    "playGame": "Jogar",
    "closePlayer": "Fechar transmissão",
    "previous": "Anterior",
    "next": "Próximo",
    "page": "Página {page} de {pages}",
    "error": "Não foi possível carregar as transmissões. Tente mais tarde.",
    "retry": "Tentar novamente"
  }
} satisfies I18nMessages

export const ptHomeFaqs = {
  "title": "Perguntas frequentes",
  "subtitle": "Respostas sobre jogos, plataformas e controles.",
  "items": [
    {
      "question": "Posso jogar jogos retrô online?",
      "answer": "Abra a página do jogo e pressione Jogar agora para carregá-lo no navegador."
    },
    {
      "question": "Preciso instalar um emulador?",
      "answer": "Não é necessário instalar um emulador separado. O navegador carrega os dados do jogo."
    },
    {
      "question": "Quais plataformas estão disponíveis?",
      "answer": "Você pode explorar NES, SNES, GBA, PS1, N64, arcade, Sega Genesis e outras plataformas usando os filtros."
    },
    {
      "question": "Posso jogar no celular?",
      "answer": "Use um navegador moderno. Os controles de toque e a compatibilidade dependem do jogo e do dispositivo."
    },
    {
      "question": "Como encontro um jogo?",
      "answer": "Busque pelo título original, série ou plataforma. O nome pode variar entre regiões."
    }
  ]
} satisfies HomeFaqs
export const ptBlogFaqs = ptHomeFaqs
