import Link from 'next/link'
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
          href={NAV.cta.href}
          className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-ink)] transition-colors hover:bg-[var(--accent-strong)]"
        >
          {NAV.cta.label}
        </Link>
      </nav>
    </header>
  )
}
