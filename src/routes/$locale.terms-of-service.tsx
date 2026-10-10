import { createFileRoute } from '@tanstack/react-router'

import { SiteLayout } from '#/components/site-layout'
import type { Locale } from '#/lib/ggemu'
import { normalizeLocale } from '#/lib/i18n'
import { getLocalizedSeoLinks, getSeoOrigin } from '#/lib/seo'

type LegalCopy = {
  eyebrow: string
  title: string
  description: string
  intro: string
  sections: Array<{ title: string; body: string }>
}

const termsCopies: Record<Locale, LegalCopy> = {
  'zh-TW': {
    eyebrow: '法律',
    title: '服務條款',
    description: '說明使用本網站的基本規則和條件的服務條款。',
    intro:
      '本服務條款說明訪問和使用本網站的基本規則。使用本網站即表示用戶同意遵守這些條款以及適用法律。',
    sections: [
      {
        title: '網站使用',
        body:
          '用戶可以出於個人、合法和非商業目的訪問本網站、瀏覽內容和遊玩遊戲。用戶不得濫用網站、干擾網站運行、嘗試未經授權的訪問，或以損害可用性和性能的方式使用自動化系統。',
      },
      {
        title: '遊戲內容',
        body:
          '遊戲信息、媒體和可遊玩內容可能由用戶、第三方或公開來源提供。可用性可能隨時變化，並非每款遊戲都能在所有瀏覽器、設備或地區正常運行。',
      },
      {
        title: '用戶責任',
        body:
          '用戶有責任遵守適用法律，並確保其在所在地使用本網站的行為是合規且適當的。如果用戶無權訪問某些內容，應停止使用相關內容。',
      },
      {
        title: '知識產權',
        body:
          '所有商標、遊戲名稱、圖片、媒體和相關材料均歸其各自權利人所有。本網站內容不轉讓所有權，也不授予普通網站訪問之外的任何權利。',
      },
      {
        title: '無保證',
        body:
          '本網站按現狀和可用狀態提供。不保證網站一定持續可用、無錯誤、安全，或兼容所有設備和瀏覽器。',
      },
      {
        title: '條款變更',
        body:
          '這些條款可能會不定期更新。變更發佈後繼續使用本網站，即表示更新後的條款適用於後續使用。',
      },
    ],
  },
  ko: {
    eyebrow: '법적 안내', title: '이용약관', description: '이 웹사이트 이용에 관한 기본 규칙과 조건입니다.',
    intro: '이 약관은 웹사이트 접근과 이용에 관한 기본 규칙을 설명합니다. 웹사이트를 이용하면 본 약관과 적용 법률을 준수하는 데 동의한 것으로 봅니다.',
    sections: [
      { title: '웹사이트 이용', body: '개인적이고 합법적인 비상업적 탐색과 게임 플레이를 위해 이용할 수 있습니다. 웹사이트 오용, 운영 방해, 무단 접근 시도 또는 가용성과 성능을 해치는 자동화 시스템 사용은 금지됩니다.' },
      { title: '게임 콘텐츠', body: '게임 정보, 미디어 및 플레이 가능한 콘텐츠는 사용자, 제삼자 또는 공개된 출처에서 제공될 수 있습니다. 이용 가능 여부는 예고 없이 변경될 수 있으며 모든 게임이 모든 브라우저, 기기 또는 지역에서 작동하는 것은 아닙니다.' },
      { title: '사용자 책임', body: '사용자는 적용 법률을 준수하고 자신의 지역에서 웹사이트 이용이 적절한지 확인할 책임이 있습니다. 접근 권한이 없는 콘텐츠의 이용은 중단해야 합니다.' },
      { title: '지식재산권', body: '모든 상표, 게임 이름, 이미지, 미디어와 관련 자료는 각 권리자에게 귀속됩니다. 웹사이트는 소유권을 이전하거나 일반적인 웹사이트 접근 이외의 권리를 부여하지 않습니다.' },
      { title: '보증 없음', body: '웹사이트는 현재 상태와 제공 가능한 상태로 제공됩니다. 지속적인 가용성, 오류 없음, 보안 또는 모든 기기와 브라우저의 호환성을 보증하지 않습니다.' },
      { title: '약관 변경', body: '약관은 수시로 업데이트될 수 있습니다. 변경 내용 게시 후 계속 이용하면 이후 이용에 업데이트된 약관이 적용됩니다.' },
    ],
  },
  'zh-CN': {
    eyebrow: '法律',
    title: '服务条款',
    description: '说明使用本网站的基本规则和条件的服务条款。',
    intro:
      '本服务条款说明访问和使用本网站的基本规则。使用本网站即表示用户同意遵守这些条款以及适用法律。',
    sections: [
      {
        title: '网站使用',
        body:
          '用户可以出于个人、合法和非商业目的访问本网站、浏览内容和游玩游戏。用户不得滥用网站、干扰网站运行、尝试未经授权的访问，或以损害可用性和性能的方式使用自动化系统。',
      },
      {
        title: '游戏内容',
        body:
          '游戏信息、媒体和可游玩内容可能由用户、第三方或公开来源提供。可用性可能随时变化，并非每款游戏都能在所有浏览器、设备或地区正常运行。',
      },
      {
        title: '用户责任',
        body:
          '用户有责任遵守适用法律，并确保其在所在地使用本网站的行为是合规且适当的。如果用户无权访问某些内容，应停止使用相关内容。',
      },
      {
        title: '知识产权',
        body:
          '所有商标、游戏名称、图片、媒体和相关材料均归其各自权利人所有。本网站内容不转让所有权，也不授予普通网站访问之外的任何权利。',
      },
      {
        title: '无保证',
        body:
          '本网站按现状和可用状态提供。不保证网站一定持续可用、无错误、安全，或兼容所有设备和浏览器。',
      },
      {
        title: '条款变更',
        body:
          '这些条款可能会不定期更新。变更发布后继续使用本网站，即表示更新后的条款适用于后续使用。',
      },
    ],
  },
  en: {
    eyebrow: 'Legal',
    title: 'Terms of Service',
    description:
      'Terms of Service describing the basic rules and conditions for using this website.',
    intro:
      'These Terms of Service describe the basic rules for accessing and using this website. By using the website, users agree to follow these terms and any applicable laws.',
    sections: [
      {
        title: 'Use of the website',
        body:
          'Users may access the website for personal, lawful, and non-commercial browsing and gameplay. Users must not misuse the website, interfere with its operation, attempt unauthorized access, or use automated systems in a way that harms availability or performance.',
      },
      {
        title: 'Game content',
        body:
          'Game information, media, and playable content may be provided by users, third parties, or publicly available sources. Availability may change without notice, and not every game may work on every browser, device, or region.',
      },
      {
        title: 'User responsibility',
        body:
          'Users are responsible for complying with applicable laws and for ensuring that their use of the website is appropriate in their location. Users should stop using any content that they are not permitted to access.',
      },
      {
        title: 'Intellectual property',
        body:
          'All trademarks, game titles, images, media, and related materials belong to their respective owners. Nothing on the website transfers ownership or grants rights beyond ordinary website access.',
      },
      {
        title: 'No warranties',
        body:
          'The website is provided on an as-is and as-available basis. No guarantee is made that the website will be uninterrupted, error-free, secure, or compatible with every device or browser.',
      },
      {
        title: 'Changes to these terms',
        body:
          'These terms may be updated from time to time. Continued use of the website after changes are posted means that the updated terms apply to future use.',
      },
    ],
  },
  ja: {
    eyebrow: '法的情報',
    title: '利用規約',
    description: 'このサイトを利用するための基本的な規則と条件を説明する利用規約です。',
    intro:
      'この利用規約は、本サイトへアクセスし利用するための基本的な規則を説明します。本サイトを利用することで、ユーザーは本規約および適用される法律に従うことに同意します。',
    sections: [
      {
        title: 'サイトの利用',
        body:
          'ユーザーは、個人的、合法的、非商用の閲覧およびゲームプレイ目的で本サイトを利用できます。サイトを不正利用したり、運営を妨害したり、無許可のアクセスを試みたり、可用性や性能を損なう自動化システムを使用してはいけません。',
      },
      {
        title: 'ゲームコンテンツ',
        body:
          'ゲーム情報、メディア、プレイ可能なコンテンツは、ユーザー、第三者、または公開情報源から提供される場合があります。提供状況は予告なく変更されることがあり、すべてのゲームがすべてのブラウザー、端末、地域で動作するとは限りません。',
      },
      {
        title: 'ユーザーの責任',
        body:
          'ユーザーは適用法を遵守し、自身の地域での本サイト利用が適切であることを確認する責任があります。アクセスが許可されていないコンテンツの利用は停止してください。',
      },
      {
        title: '知的財産',
        body:
          'すべての商標、ゲームタイトル、画像、メディア、関連素材は、それぞれの権利者に帰属します。本サイトの内容は所有権を移転するものではなく、通常のサイトアクセスを超える権利を付与するものでもありません。',
      },
      {
        title: '保証の否認',
        body:
          '本サイトは現状有姿かつ提供可能な範囲で提供されます。サイトが中断なく、エラーなく、安全に、またはすべての端末やブラウザーに対応して動作することを保証しません。',
      },
      {
        title: '規約の変更',
        body:
          '本規約は随時更新される場合があります。変更掲載後も本サイトを利用し続ける場合、更新後の規約が今後の利用に適用されます。',
      },
    ],
  },
}

export const Route = createFileRoute('/$locale/terms-of-service')({
  loader: () => getSeoOrigin(),
  head: ({ loaderData, params }) => {
    const locale = normalizeLocale(params.locale)
    const copy = termsCopies[locale]

    return {
      links: loaderData
        ? getLocalizedSeoLinks({
            locale,
            origin: loaderData,
            path: '/terms-of-service',
          })
        : undefined,
      meta: [
        { title: copy.title },
        { name: 'description', content: copy.description },
      ],
    }
  },
  component: TermsOfServicePage,
})

function TermsOfServicePage() {
  const { locale } = Route.useParams()
  const lang = normalizeLocale(locale)
  const copy = termsCopies[lang]

  return (
    <SiteLayout locale={lang}>
      <LegalPage copy={copy} />
    </SiteLayout>
  )
}

function LegalPage({ copy }: { copy: LegalCopy }) {
  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">
        {copy.eyebrow}
      </p>
      <h1 className="mt-3 text-4xl font-semibold leading-tight">{copy.title}</h1>
      <p className="mt-5 text-base leading-7 text-base-content/70">{copy.intro}</p>

      <div className="mt-10 space-y-6">
        {copy.sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <p className="mt-3 leading-7 text-base-content/70">
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </article>
  )
}
