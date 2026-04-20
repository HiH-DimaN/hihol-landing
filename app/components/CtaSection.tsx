import MagneticCTA from './MagneticCTA'

const bullets = [
  'где теряете время и деньги',
  'срок окупаемости автоматизации',
  'что делать первым',
]

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4 shrink-0"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
    >
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function TelegramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0Zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.064-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.329-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635Z" />
    </svg>
  )
}

export default function CtaSection() {
  return (
    <section
      id="contact"
      className="relative flex min-h-[70vh] items-center overflow-hidden bg-gradient-to-br from-cyan-900/40 via-slate-950 to-fuchsia-900/20 px-6 py-24"
    >
      {/* aurora blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-24 left-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[140px] animate-aurora-slow" />
        <div className="absolute -bottom-32 right-1/4 h-[600px] w-[600px] rounded-full bg-violet-500/20 blur-[160px] animate-aurora" />
      </div>

      {/* grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-grid bg-grid-fade opacity-40"
      />

      {/* top + bottom hairlines */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-3xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
          Готовы посчитать,{' '}
          <span className="text-gradient-accent">сколько теряете</span>{' '}
          на рутине?
        </h2>

        <p className="mt-8 text-pretty text-lg leading-relaxed text-slate-200 md:text-xl">
          Заполните анкету — 10 минут. Через 1–2 рабочих дня пришлю PDF-отчёт:
        </p>

        <ul className="mx-auto mt-6 flex max-w-sm flex-col gap-3 text-left text-slate-200">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span className="mt-1 text-cyan-400">
                <CheckIcon />
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-slate-300">
          Бесплатно, без звонков, без спама.
        </p>

        <div className="mt-12 flex flex-col items-center gap-5">
          <MagneticCTA
            href="https://forms.gle/3QBDFKuK3DvGQm1n6"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-violet-500 px-10 py-5 text-lg font-semibold text-slate-950 shadow-[0_0_50px_-8px_rgba(34,211,238,0.8)] hover:shadow-[0_0_80px_-4px_rgba(167,139,250,0.9)]"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
            <span className="relative">Заполнить анкету</span>
            <ArrowIcon />
          </MagneticCTA>

          <a
            href="https://t.me/dmitry_hihol"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-cyan-300"
          >
            <TelegramIcon />
            <span>
              Или напишите напрямую{' '}
              <span className="text-cyan-400 group-hover:text-cyan-200">
                @dmitry_hihol
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
