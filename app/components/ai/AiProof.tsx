import Link from 'next/link'
import { AI_PRODUCTS, AI_PROOF, AI_STACK_ITEMS } from '../../lib/aiData'
import { nichePages } from '../../lib/nichePages'
import AiSectionHeading from './AiSectionHeading'

const PROOF_ITEMS = nichePages.tradeAutomation.proof?.items ?? []

export default function AiProof() {
  return (
    <section id="proof" className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6 sm:py-20">
      <AiSectionHeading eyebrow={AI_PROOF.eyebrow} title={AI_PROOF.title} text={AI_PROOF.text} />
      <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PROOF_ITEMS.map((item) => (
          <div key={item.value} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <dt className="text-3xl font-semibold text-[var(--accent-text)]">{item.value}</dt>
            <dd className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{item.label}</dd>
          </div>
        ))}
      </dl>
      <Link href={AI_PROOF.linkHref} className="mt-6 inline-flex min-h-[44px] items-center font-semibold text-[var(--accent-text)] hover:underline">
        {AI_PROOF.linkLabel} →
      </Link>

      <h3 className="mt-14 text-2xl font-semibold">{AI_PROOF.productsTitle}</h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {AI_PRODUCTS.map((product) => (
          <a key={product.href} href={product.href} target="_blank" rel="noopener noreferrer" className="group flex min-h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--accent)] hover:shadow-lg">
            <p className="text-sm font-semibold text-[var(--accent-text)]">{product.status}</p>
            <h4 className="mt-5 text-2xl font-semibold">{product.title}</h4>
            <p className="mt-3 flex-1 leading-relaxed text-[var(--text-muted)]">{product.text}</p>
            <p className="mt-6 border-t border-[var(--border)] pt-4 font-semibold text-[var(--accent-text)]">Открыть проект ↗</p>
          </a>
        ))}
      </div>

      <div className="relative left-1/2 mt-12 w-screen -translate-x-1/2 overflow-hidden border-y border-white/10 bg-[#0b221d] py-3 text-white">
        <div className="marquee-track flex gap-8 text-sm text-white/75" style={{ animationDuration: '140s' }}>
          {[...Array(4)].flatMap((_, copy) =>
            AI_STACK_ITEMS.map((item) => (
              <span
                key={`${copy}-${item}`}
                aria-hidden={copy > 0 || undefined}
                className={copy > 0 ? 'marquee-dup whitespace-nowrap' : 'whitespace-nowrap'}
              >
                {item}
              </span>
            )),
          )}
        </div>
      </div>
    </section>
  )
}
