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
