import { Link } from '@tanstack/react-router'

import { SiteLayout } from '#/components/site-layout'

export function BrawlStarsGuideShell({ children, currentPage }: { children: React.ReactNode; currentPage: string }) {
  return (
    <SiteLayout locale="en" localePaths={{ en: currentPage }}>
      <main className="min-h-screen bg-[#050b18] text-slate-100">
        <div className="border-b border-white/10 bg-slate-950/80">
          <nav aria-label="Breadcrumb" className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-4 text-sm text-slate-400 sm:px-6 lg:px-8">
            <Link className="hover:text-sky-300" params={{ locale: 'en' }} to="/$locale/guides">Guides</Link>
            <span aria-hidden="true">/</span>
            <Link className="hover:text-sky-300" to="/guides/brawl-stars">Brawl Stars</Link>
          </nav>
        </div>
        {children}
      </main>
    </SiteLayout>
  )
}

export function BrawlStarsHero({
  children,
  imageAlt,
  imagePath,
  tone = 'blue',
}: {
  children: React.ReactNode
  imageAlt: string
  imagePath: string
  tone?: 'blue' | 'purple'
}) {
  const accent = tone === 'blue' ? 'from-sky-400/25' : 'from-fuchsia-400/25'

  return (
    <header className="relative isolate overflow-hidden border-b border-white/10 bg-[#040814]">
      <div className="relative h-64 overflow-hidden sm:h-80 lg:absolute lg:inset-0 lg:h-auto">
        <img
          alt={imageAlt}
          className="h-full w-full object-cover object-[68%_center] lg:object-center"
          decoding="async"
          fetchPriority="high"
          height="900"
          src={imagePath}
          width="1600"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#040814] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#040814] lg:from-0% lg:via-[#040814]/90 lg:via-38% lg:to-transparent lg:to-72%" />
      </div>
      <div aria-hidden="true" className={`absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t ${accent} to-transparent opacity-40`} />
      <div className="relative mx-auto max-w-6xl px-4 pb-14 sm:px-6 sm:pb-18 lg:flex lg:min-h-[36rem] lg:items-center lg:px-8 lg:py-20">
        <div className="max-w-[42rem] lg:w-[58%]">{children}</div>
      </div>
    </header>
  )
}

export function GuideSection({ children, id, title }: { children: React.ReactNode; id?: string; title: string }) {
  return (
    <section className="scroll-mt-24 border-t border-white/10 py-10 sm:py-14" id={id}>
      <h2 className="text-2xl font-black text-white sm:text-3xl">{title}</h2>
      <div className="mt-5 text-base leading-8 text-slate-300">{children}</div>
    </section>
  )
}

export function SourceLink({ children, href }: { children: React.ReactNode; href: string }) {
  return <a className="font-semibold text-sky-300 underline decoration-sky-500/60 underline-offset-4 hover:text-sky-200" href={href} rel="noopener noreferrer" target="_blank">{children} ↗</a>
}
