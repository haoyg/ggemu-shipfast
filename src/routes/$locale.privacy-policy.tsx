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
  sections: Array<{
    title: string
    body: string
    links?: Array<{ href: string; label: string }>
  }>
}

const privacyCopies: Record<Locale, LegalCopy> = {
  'zh-CN': {
    eyebrow: '法律',
    title: '隐私政策',
    description: '说明本网站可能如何收集、使用和处理信息的隐私政策。',
    intro:
      '本隐私政策说明访客使用本网站时，信息可能如何被收集、使用和处理。该说明用于提供一般信息，并可能不定期更新。',
    sections: [
      {
        title: '收集的信息',
        body:
          '本网站可能收集浏览器类型、设备信息、访问页面、来源页面和大致使用活动等基础技术信息。如果用户联系网站运营者，消息中提供的信息也可能用于支持和回复。',
      },
      {
        title: '信息用途',
        body:
          '信息可能用于运营网站、提升性能、了解整体使用趋势、防止滥用、回复请求，并维护服务的安全性和稳定性。',
      },
      {
        title: 'Cookie 和类似技术',
        body:
          '本网站可能使用 Cookie、本地存储或类似技术来记住偏好、支持分析并改善浏览体验。用户可以通过浏览器设置控制 Cookie，但禁用存储后部分功能可能无法按预期工作。',
      },
      {
        title: '第三方服务',
        body:
          '本网站可能使用第三方服务进行托管、分析、广告、嵌入内容或游戏交付。这些服务提供方可能会按照其隐私政策和条款处理信息。',
      },
      {
        title: 'Google 广告与分析',
        body:
          '本网站可能使用 Google AdSense 和 Google Analytics。Google 及其合作伙伴可能因提供广告和衡量服务而放置或读取 Cookie，并使用网络信标、IP 地址、设备标识符、访问页面以及此前访问本网站或其他网站的信息。Google 会根据适用的同意选择决定是否使用数据进行广告个性化。',
        links: [
          {
            href: 'https://policies.google.com/technologies/partner-sites',
            label: '了解 Google 如何使用合作伙伴网站提供的信息',
          },
          {
            href: 'https://adssettings.google.com/',
            label: '管理 Google 广告设置',
          },
        ],
      },
      {
        title: '数据保留',
        body:
          '信息仅会在运营、法律、安全或支持目的合理需要的期限内保留。保留期限可能因信息类型和处理原因而异。',
      },
      {
        title: '联系我们',
        body:
          '用户可以使用网站公布的联系方式，就隐私问题、更正请求或移除请求联系网站运营者。',
      },
    ],
  },
  en: {
    eyebrow: 'Legal',
    title: 'Privacy Policy',
    description:
      'Privacy Policy explaining how information may be collected, used, and handled on this website.',
    intro:
      'This Privacy Policy explains how information may be collected, used, and handled when visitors use this website. It is intended as general information and may be updated from time to time.',
    sections: [
      {
        title: 'Information collected',
        body:
          'The website may collect basic technical information such as browser type, device information, pages visited, referring pages, and approximate usage activity. If users contact the site operator, the information provided in that message may also be processed for support and response purposes.',
      },
      {
        title: 'How information is used',
        body:
          'Information may be used to operate the website, improve performance, understand general usage trends, prevent abuse, respond to requests, and maintain the safety and reliability of the service.',
      },
      {
        title: 'Cookies and similar technologies',
        body:
          'Cookies, local storage, or similar technologies may be used to remember preferences, support analytics, and improve the browsing experience. Users can control cookies through browser settings, although some features may not work as expected if storage is disabled.',
      },
      {
        title: 'Third-party services',
        body:
          'The website may use third-party services for hosting, analytics, advertising, embedded content, or game delivery. These providers may process information according to their own privacy policies and terms.',
      },
      {
        title: 'Google advertising and analytics',
        body:
          'The website may use Google AdSense and Google Analytics. Google and its partners may place or read cookies and use web beacons, IP addresses, device identifiers, pages visited, and information from prior visits to this or other websites to provide and measure advertising. Google uses applicable consent choices to determine whether data may be used for ad personalization.',
        links: [
          {
            href: 'https://policies.google.com/technologies/partner-sites',
            label: 'How Google uses information from partner sites',
          },
          {
            href: 'https://adssettings.google.com/',
            label: 'Manage Google ad settings',
          },
        ],
      },
      {
        title: 'Data retention',
        body:
          'Information is retained only as long as reasonably necessary for operational, legal, security, or support purposes. Retention periods may vary depending on the type of information and the reason it is processed.',
      },
      {
        title: 'Contact',
        body:
          'Users may contact the site operator with privacy questions, correction requests, or removal requests using the contact details provided on the website.',
      },
    ],
  },
  ja: {
    eyebrow: '法的情報',
    title: 'プライバシーポリシー',
    description:
      'このサイトで情報がどのように収集、利用、処理される可能性があるかを説明するプライバシーポリシーです。',
    intro:
      'このプライバシーポリシーは、訪問者が本サイトを利用する際に情報がどのように収集、利用、処理される可能性があるかを説明します。一般的な情報として提供され、必要に応じて更新されます。',
    sections: [
      {
        title: '収集される情報',
        body:
          '本サイトは、ブラウザーの種類、端末情報、閲覧ページ、参照元ページ、おおよその利用状況などの基本的な技術情報を収集する場合があります。ユーザーが運営者に連絡した場合、そのメッセージ内の情報もサポートや返信のために処理されることがあります。',
      },
      {
        title: '情報の利用目的',
        body:
          '情報は、サイト運営、パフォーマンス改善、一般的な利用傾向の把握、不正利用の防止、問い合わせ対応、サービスの安全性と信頼性の維持に利用される場合があります。',
      },
      {
        title: 'Cookie と類似技術',
        body:
          '本サイトでは、設定の保存、分析のサポート、閲覧体験の改善のために Cookie、ローカルストレージ、または類似技術を使用する場合があります。ブラウザー設定で Cookie を管理できますが、無効にすると一部機能が正常に動作しないことがあります。',
      },
      {
        title: '第三者サービス',
        body:
          '本サイトは、ホスティング、分析、広告、埋め込みコンテンツ、ゲーム配信のために第三者サービスを利用する場合があります。これらの提供者は、それぞれのプライバシーポリシーと規約に従って情報を処理することがあります。',
      },
      {
        title: 'Google の広告と分析',
        body:
          '本サイトは Google AdSense および Google Analytics を利用する場合があります。Google とそのパートナーは、広告の配信と測定のために Cookie の保存や読み取りを行い、ウェブビーコン、IP アドレス、端末識別子、閲覧ページ、本サイトまたは他のサイトへの過去のアクセス情報を使用する場合があります。広告のパーソナライズにデータを利用できるかどうかは、適用される同意設定に従って判断されます。',
        links: [
          {
            href: 'https://policies.google.com/technologies/partner-sites',
            label: 'Google によるパートナーサイト情報の利用について',
          },
          {
            href: 'https://adssettings.google.com/',
            label: 'Google 広告設定を管理',
          },
        ],
      },
      {
        title: 'データ保持',
        body:
          '情報は、運営、法的対応、セキュリティ、サポートの目的で合理的に必要な期間のみ保持されます。保持期間は情報の種類や処理理由によって異なります。',
      },
      {
        title: 'お問い合わせ',
        body:
          'プライバシーに関する質問、修正依頼、削除依頼は、サイトに掲載されている連絡先から運営者へお問い合わせください。',
      },
    ],
  },
}

export const Route = createFileRoute('/$locale/privacy-policy')({
  loader: () => getSeoOrigin(),
  head: ({ loaderData, params }) => {
    const locale = normalizeLocale(params.locale)
    const copy = privacyCopies[locale]

    return {
      links: loaderData
        ? getLocalizedSeoLinks({
            locale,
            origin: loaderData,
            path: '/privacy-policy',
          })
        : undefined,
      meta: [
        { title: copy.title },
        { name: 'description', content: copy.description },
      ],
    }
  },
  component: PrivacyPolicyPage,
})

function PrivacyPolicyPage() {
  const { locale } = Route.useParams()
  const lang = normalizeLocale(locale)
  const copy = privacyCopies[lang]

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
            {section.links ? (
              <ul className="mt-3 space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a
                      className="link link-primary"
                      href={link.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
    </article>
  )
}
