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
            <span>Brawl Stars</span>
          </nav>
        </div>
        {children}
      </main>
    </SiteLayout>
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
