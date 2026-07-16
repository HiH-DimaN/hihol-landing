import Link from 'next/link'
import TrackedLink from '../TrackedLink'
import { NAV } from '../../lib/complianceData'

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-[1080px] items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-bold tracking-tight text-[var(--text)]">
          {NAV.logo}
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {NAV.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <Link
          href="/ai"
          className="inline-flex min-h-[44px] items-center text-xs font-semibold text-[var(--accent-text)] md:hidden"
        >
          AI-решения
        </Link>
        <TrackedLink
          href={NAV.cta.href}
          goalName="cta_nav_check"
          className="inline-flex min-h-[44px] items-center rounded-lg bg-[var(--accent)] px-3 text-xs font-semibold text-[var(--accent-ink)] shadow-sm transition-colors hover:bg-[var(--accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:px-4 sm:text-sm"
        >
          {NAV.cta.label}
        </TrackedLink>
      </nav>
    </header>
  )
}
