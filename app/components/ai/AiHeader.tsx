import Link from 'next/link'
import { AI_NAV } from '../../lib/aiData'
import { aiIntakeHref } from '../../lib/aiIntakeData'
import TrackedLink from '../TrackedLink'

export default function AiHeader({ linkSectionsToHub = false }: { linkSectionsToHub?: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/ai" className="text-lg font-bold tracking-tight text-[var(--text)]">
          HIHOL <span className="text-[var(--accent-text)]">AI</span>
        </Link>
        <div className="hidden items-center gap-6 lg:flex">
          {AI_NAV.map((item) => (
            <Link
              key={item.href}
              href={linkSectionsToHub ? `/ai${item.href}` : item.href}
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/" className="text-sm font-medium text-[var(--accent-text)] hover:text-[var(--text)]">
            Проверка 152-ФЗ
          </Link>
        </div>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center text-xs font-semibold text-[var(--accent-text)] lg:hidden"
        >
          152-ФЗ
        </Link>
        <TrackedLink
          href={aiIntakeHref('ai_nav')}
          goalName="ai_nav_diagnostic"
          className="inline-flex min-h-11 items-center rounded-lg bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-strong)]"
        >
          <span className="sm:hidden">Диагностика</span>
          <span className="hidden sm:inline">Пройти диагностику</span>
        </TrackedLink>
      </nav>
    </header>
  )
}
