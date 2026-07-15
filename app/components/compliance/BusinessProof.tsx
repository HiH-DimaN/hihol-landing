import { PROOF } from '../../lib/complianceData'

export default function BusinessProof() {
  return (
    <section
      aria-label={PROOF.label}
      className="relative z-10 mx-auto -mt-6 max-w-[1080px] px-4 sm:px-6"
    >
      <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_18px_60px_rgba(15,35,25,0.12)] lg:grid-cols-4">
        {PROOF.items.map((item, index) => (
          <div
            key={item.label}
            className={`px-4 py-5 sm:px-6 ${
              index % 2 === 0 ? 'border-r border-[var(--border)]' : ''
            } ${index < 2 ? 'border-b border-[var(--border)] lg:border-b-0' : ''} ${
              index === 1 ? 'lg:border-r' : ''
            }`}
          >
            <p className="text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">
              {item.value}
            </p>
            <p className="mt-1 text-xs leading-snug text-[var(--text-muted)] sm:text-sm">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
