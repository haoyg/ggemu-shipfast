import { siteConfig } from '#/lib/site-config'
import type { HomeFaqs, I18nMessages } from './types'

export const koMessages = {
  layout: {
    games: '홈', live: '라이브', explore: '둘러보기', playMyRom: '내 ROM 실행', blog: '블로그', about: '소개', legal: '법적 안내',
    privacyPolicy: '개인정보 처리방침', termsOfService: '이용약관', copyrightRemoval: '저작권 및 삭제 요청', theme: '테마', language: '언어',
    tagline: 'POKOPIE에서 레트로 게임을 즐기세요',
    get copyright() { return `Copyright ${new Date().getUTCFullYear()} ${siteConfig.SITE_NAME}` },
    get disclaimer() { return `게임 이름, 이미지, 상표 및 관련 자료는 각 권리자에게 귀속됩니다. 권리자는 저작권 절차 또는 ${siteConfig.SITE_EMAIL}을 통해 검토 및 삭제를 요청할 수 있습니다.` },
    footer: '브라우저에서 클래식 레트로 게임을 바로 즐기세요. 별도 설치가 필요 없습니다.',
  },
  home: {
    title: '레트로 게임을 온라인으로 — 설치 없이 즐기세요',
    subtitle: 'NES, SNES, GBA, PS1, 아케이드, Sega Genesis 등 다양한 플랫폼의 클래식 게임을 찾아보세요. 설치나 가입 없이 브라우저에서 시작할 수 있습니다.',
    heroSearchHint: '게임 이름, 플랫폼 또는 시리즈로 검색하세요.', browsePopular: '인기 게임 보기', discovery: '더 둘러보기',
    searchPlaceholder: '게임 이름, 플랫폼 또는 시리즈 검색…', search: '검색', closeSearch: '검색 닫기', reset: '초기화',
    allPlatforms: '모든 플랫폼', allCategories: '모든 장르', newest: '최신순', popular: '인기순', oldest: '오래된 순', nameAsc: '이름순', sortBy: '정렬',
    empty: '게임을 찾을 수 없습니다', previous: '이전', next: '다음', page: '{page} / {pages} 페이지', totalGames: '게임 {total}개',
    views: '조회', plays: '플레이', details: '상세 정보', featured: '브라우저에서 즐기는 레트로 게임', recentlyPlayed: '최근 플레이한 게임',
    latestBlogPosts: '최신 블로그 글', latestBlogSubtitle: '게임 공략, 브라우저 플레이 팁과 레트로 게임 이야기를 읽어보세요.', viewAllBlog: '모든 글 보기',
    blogPostFallback: '블로그 글', loadError: '게임을 불러오지 못했습니다. 연결을 확인한 후 다시 시도하세요.', loading: '게임 불러오는 중…', retry: '다시 시도',
  },
  homeSeo: {
    title: '무료 온라인 레트로 게임 — NES, SNES, GBA | POKOPIE',
    description: 'NES, SNES, GBA, PS1 및 아케이드 게임을 브라우저에서 무료로 즐기세요. 설치나 가입 없이 클래식 게임을 찾아 바로 시작하세요.',
    keywords: '레트로 게임, 온라인 게임, NES 게임, SNES 게임, GBA 게임, PS1 게임, 아케이드 게임',
  },
  homeContent: {
    whyTitle: '레트로 게임을 온라인으로 즐기는 이유',
    whyBody: 'POKOPIE에서는 별도로 에뮬레이터를 설치하거나 계정을 만들지 않고도 클래식 게임을 즐길 수 있습니다. 게임 페이지를 열고 플레이 버튼을 누르면 브라우저가 게임을 불러옵니다. NES, SNES, Game Boy Advance, PlayStation, 아케이드, Sega Genesis, Nintendo 64 등 다양한 플랫폼을 탐색하거나 이름으로 검색할 수 있습니다. 각 게임 페이지에는 설명, 플랫폼 정보, 조작 안내, 관련 게임과 공유 기능이 제공됩니다. 지원 기능과 기기는 게임 및 플레이어에 따라 다를 수 있습니다.',
    howTitle: '플레이 방법',
    howSteps: [
      { title: '게임 선택', body: '이름으로 검색하거나 NES, SNES, GBA, PS1, 아케이드 등의 플랫폼을 둘러보세요.' },
      { title: '게임 페이지 열기', body: '게임 카드에서 표지, 상세 정보, 관련 게임과 플레이 버튼이 있는 페이지로 이동합니다.' },
      { title: '브라우저에서 시작', body: '지금 플레이를 누르고 게임에서 지원하는 키보드, 터치 조작 또는 게임패드를 사용하세요.' },
    ],
  },
  detail: {
    home: '게임', play: '지금 플레이', playPage: '새 탭에서 플레이', playPageHint: '새 브라우저 탭에서 게임 플레이어가 열립니다.', install: '앱 설치',
    installUnavailable: '설치를 준비 중입니다. 설치 안내가 표시되지 않으면 페이지를 새로고침한 후 다시 시도하세요.', installDismissed: '설치가 취소되었습니다.',
    installGuideTitle: '홈 화면에 게임 추가', installGuideIntro: '브라우저에서 설치 안내가 표시되지 않아도 직접 추가할 수 있습니다.',
    installGuideIos: 'iPhone 또는 iPad: Safari에서 이 페이지를 열고 공유 버튼을 누른 다음 홈 화면에 추가를 선택하세요.',
    installGuideAndroid: 'Android: Chrome에서 이 페이지를 열고 메뉴 또는 공유 버튼에서 앱 설치나 홈 화면에 추가를 선택하세요.',
    installGuideDesktop: 'PC의 Chrome 또는 Edge: 주소 표시줄의 설치 아이콘이나 브라우저 메뉴의 앱 설치를 사용하세요.',
    installGuideClose: '확인', share: '공유', copyFailed: '복사하지 못했습니다. 페이지 주소를 복사하거나 삽입 코드를 직접 선택하세요.', posterFailed: '공유 이미지를 만들지 못했습니다. 다시 시도하세요.',
    generatePoster: '공유 이미지 만들기', systemShare: '기기에서 공유', copyEmbedCode: '삽입 코드 복사', embedCodeCopied: '삽입 코드를 복사했습니다.',
    embedCardTitle: '게임 삽입', embedCardDescription: '다른 웹사이트에 이 게임을 삽입하고 POKOPIE 링크를 제공할 수 있습니다.', embedCodeLabel: 'Iframe 삽입 코드',
    posterTitle: '공유 이미지', downloadPoster: '이미지 다운로드', posterScanCta: '스캔하고 바로 플레이하세요. 별도 설치가 필요 없습니다.', shareUnavailableCopied: '기기 공유를 사용할 수 없어 링크를 복사했습니다.',
    overview: '게임 소개', keywords: '키워드', howToPlay: '플레이 방법', details: '게임 정보', platform: '플랫폼', developer: '개발사', released: '출시일', players: '플레이어 수',
    views: '조회', plays: '플레이', categories: '장르', languages: '게임 언어', noData: '정보 없음', browserReady: '브라우저에서 플레이', noDownload: '별도 설치 불필요', faq: '자주 묻는 질문', relatedGames: '관련 게임',
  },
  about: { title: '소개', get description() { return `${siteConfig.SITE_NAME}은 브라우저에서 클래식 레트로 게임을 즐길 수 있는 웹사이트입니다.` } },
  blog: {
    title: '레트로 게임 공략과 에뮬레이터 팁', description: '레트로 게임 공략, 브라우저 플레이 팁, 설정 안내와 클래식 게임을 즐기는 방법을 읽어보세요.',
    subtitle: '실용적인 공략, 브라우저 플레이 안내와 클래식 게임 이야기를 만나보세요.', eyebrow: '레트로 게임 가이드', empty: '아직 게시글이 없습니다', total: '게시글 {total}개', relatedPosts: '관련 글',
  },
  live: {
    title: '게임 라이브', description: '지금 방송 중인 클래식 게임과 라이브 방을 찾아보세요.', subtitle: '다른 사람들이 방송하는 클래식 게임을 보고 다음에 즐길 게임을 찾아보세요.',
    eyebrow: '지금 라이브', empty: '현재 라이브 방송이 없습니다', total: '라이브 방 {total}개', watchLive: '방송 보기', playGame: '게임 플레이', closePlayer: '라이브 닫기',
    previous: '이전', next: '다음', page: '{page} / {pages} 페이지', error: '라이브 방송을 불러오지 못했습니다. 잠시 후 다시 시도하세요.', retry: '다시 시도',
  },
} satisfies I18nMessages

export const koHomeFaqs = {
  title: '자주 묻는 질문', subtitle: '온라인 플레이, 게임 검색, 플랫폼 필터 및 문의 방법을 알아보세요.',
  items: [
    { question: '레트로 게임을 온라인으로 플레이할 수 있나요?', answer: '게임 상세 페이지를 열고 플레이 버튼을 누르면 브라우저에서 시작할 수 있습니다. 별도 에뮬레이터 설정은 필요하지 않습니다.' },
    { question: '에뮬레이터나 ROM을 따로 다운로드해야 하나요?', answer: '별도 설치 없이 브라우저가 게임 데이터를 불러옵니다. 게임 페이지를 열고 플레이를 시작하세요.' },
    { question: '어떤 플랫폼을 지원하나요?', answer: 'GBA, Game Boy, GBC, NDS, NES, SNES, N64, PS1, Sega Genesis, Master System, Sega CD, 아케이드, DOS, HTML5, Flash 등 다양한 플랫폼의 게임이 있습니다. 플랫폼 필터로 찾아보세요.' },
    { question: '어떤 기기에서 플레이할 수 있나요?', answer: 'PC, 태블릿과 스마트폰의 최신 브라우저를 사용할 수 있습니다. 실제 호환성과 조작 방식은 게임과 플레이어에 따라 다릅니다.' },
    { question: '원하는 게임을 찾을 수 없으면 어떻게 하나요?', answer: '영문 제목, 시리즈명, 플랫폼 이름 또는 짧은 검색어로 다시 검색하세요. 지역에 따라 제목이 다를 수 있습니다.' },
    { question: '저작권 검토나 삭제를 요청하려면 어떻게 하나요?', get answer() { return `저작권 안내 페이지 또는 ${siteConfig.SITE_EMAIL}을 통해 요청하세요. 충분한 정보가 담긴 요청을 검토하고 필요한 경우 해당 콘텐츠를 제한합니다.` } },
  ],
} satisfies HomeFaqs
export const koBlogFaqs = koHomeFaqs
