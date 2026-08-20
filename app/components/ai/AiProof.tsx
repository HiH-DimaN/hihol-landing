import { AI_PRODUCTS, AI_STACK_ITEMS } from '../../lib/aiData'
import AiSectionHeading from './AiSectionHeading'

export default function AiProof() {
  return (
    <section id="proof" className="mx-auto max-w-[1120px] px-4 py-16 sm:px-6 sm:py-20">
      <AiSectionHeading eyebrow="Проверяемые доказательства" title="Публичные продукты вместо обезличенных финансовых обещаний" text="Не публикую точные финансовые результаты клиента без подтверждаемого источника и разрешения. Ниже — продукты и код, которые можно открыть самостоятельно." />
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {AI_PRODUCTS.map((product) => (
          <a key={product.href} href={product.href} target="_blank" rel="noopener noreferrer" className="group flex min-h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--accent)] hover:shadow-lg">
            <p className="text-sm font-semibold text-[var(--accent-text)]">{product.status}</p>
            <h3 className="mt-5 text-2xl font-semibold">{product.title}</h3>
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
