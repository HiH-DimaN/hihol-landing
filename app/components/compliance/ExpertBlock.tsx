import Image from 'next/image'
import { CONTACT, EXPERT } from '../../lib/complianceData'

export default function ExpertBlock() {
  return (
    <section className="mx-auto max-w-[1080px] px-4 py-12 sm:px-6 sm:py-16">
      <h2 className="text-2xl sm:text-3xl">{EXPERT.h2}</h2>
      <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start">
        <Image
          src="/dmitry.jpg"
          alt="Дмитрий Хихол"
          width={96}
          height={96}
          className="h-24 w-24 shrink-0 rounded-full object-cover"
        />
        <div>
          <p className="max-w-2xl leading-relaxed text-[var(--text-muted)]">
            {EXPERT.text}
          </p>
          <a
            href={CONTACT.telegramChannel}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-[44px] items-center rounded-lg border border-[var(--border)] px-4 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            {EXPERT.linkLabel}
          </a>
        </div>
      </div>
    </section>
  )
}
