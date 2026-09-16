import { createFileRoute } from '@tanstack/react-router'

import { SiteLayout } from '#/components/site-layout'
import type { Locale } from '#/lib/ggemu'
import { normalizeLocale } from '#/lib/i18n'
import { getLocalizedSeoLinks, getSeoOrigin } from '#/lib/seo'
import { siteConfig } from '#/lib/site-config'

type RemovalCopy = {
  eyebrow: string
  title: string
  description: string
  intro: string
  requirementsTitle: string
  requirements: string[]
  processTitle: string
  process: string
  contactLabel: string
}

const removalCopies: Record<Locale, RemovalCopy> = {
  'zh-CN': {
    eyebrow: '法律',
    title: '版权审核与内容下架',
    description: 'POKOPIE 的版权审核、权利人通知与内容下架流程。',
    intro: '如果您是权利人或其授权代表，并认为 POKOPIE 上的内容侵犯了您的权利，请提交信息完整的审核或下架通知。',
    requirementsTitle: '通知应包含',
    requirements: ['权利人或授权代表的姓名与联系方式', '需要保护的作品或权利说明', '存在争议内容的准确 POKOPIE URL', '您认为该使用未经授权的说明', '信息真实准确且您有权提出申请的声明'],
    processTitle: '处理流程',
    process: '我们会确认收到通知、核对所提供的信息，并在审核期间视情况限制相关内容。信息不足时，我们可能要求补充材料。重复、欺诈或明显无关的请求可能不会处理。',
    contactLabel: '发送版权审核或下架通知',
  },
  en: {
    eyebrow: 'Legal',
    title: 'Copyright Review & Content Removal',
    description: 'POKOPIE copyright review, rights-holder notice, and content removal process.',
    intro: 'If you are a rights holder or an authorized representative and believe content on POKOPIE infringes your rights, send a sufficiently detailed review or removal notice.',
    requirementsTitle: 'Include in your notice',
    requirements: ['Your name, contact details, and authority to act', 'Identification of the protected work or right', 'The exact POKOPIE URL for the disputed content', 'An explanation of why you believe the use is unauthorized', 'A statement that the information is accurate and that you are authorized to submit the request'],
    processTitle: 'What happens next',
    process: 'We acknowledge the notice, review the supplied information, and may restrict the disputed content while the review is pending. We may request missing information. Repetitive, fraudulent, or clearly unrelated notices may not be processed.',
    contactLabel: 'Send a copyright review or removal notice',
  },
  ja: {
    eyebrow: '法的情報',
    title: '著作権審査とコンテンツ削除',
    description: 'POKOPIE の著作権審査、権利者通知、コンテンツ削除の手続きです。',
    intro: '権利者または正当に委任された代理人として、POKOPIE 上のコンテンツが権利を侵害していると考える場合は、必要な情報を含む審査・削除通知をお送りください。',
    requirementsTitle: '通知に必要な情報',
    requirements: ['氏名、連絡先、代理権限', '保護対象となる作品または権利の特定', '問題となるコンテンツの正確な POKOPIE URL', '利用が無許可だと考える理由', '情報が正確で申請権限があることの表明'],
    processTitle: 'その後の対応',
    process: '通知の受領を確認し、提供された情報を審査します。審査中は必要に応じて対象コンテンツを制限します。不足情報の追加をお願いする場合があります。反復的、虚偽、または明らかに無関係な通知は処理されないことがあります。',
    contactLabel: '著作権審査・削除通知を送信',
  },
}

export const Route = createFileRoute('/$locale/copyright-removal')({
  loader: () => getSeoOrigin(),
  head: ({ loaderData, params }) => {
    const locale = normalizeLocale(params.locale)
    const copy = removalCopies[locale]
    return {
      links: loaderData ? getLocalizedSeoLinks({ locale, origin: loaderData, path: '/copyright-removal' }) : undefined,
      meta: [
        { title: copy.title },
        { name: 'description', content: copy.description },
      ],
    }
  },
  component: CopyrightRemovalPage,
})

function CopyrightRemovalPage() {
  const { locale } = Route.useParams()
  const lang = normalizeLocale(locale)
  const copy = removalCopies[lang]
  const subject = encodeURIComponent('POKOPIE copyright review / removal notice')

  return (
    <SiteLayout locale={lang}>
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">{copy.eyebrow}</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight">{copy.title}</h1>
        <p className="mt-5 text-base leading-7 text-base-content/70">{copy.intro}</p>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">{copy.requirementsTitle}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-base-content/70">
            {copy.requirements.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">{copy.processTitle}</h2>
          <p className="mt-3 leading-7 text-base-content/70">{copy.process}</p>
        </section>

        <a className="btn btn-primary mt-8" href={`mailto:${siteConfig.SITE_EMAIL}?subject=${subject}`}>
          {copy.contactLabel}
        </a>
      </article>
    </SiteLayout>
  )
}
