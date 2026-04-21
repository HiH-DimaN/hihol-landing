import MagneticCTA from './MagneticCTA'
import TrackedLink from './TrackedLink'

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

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
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
            goalName="anketa_click"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-violet-500 px-10 py-5 text-lg font-semibold text-slate-950 shadow-[0_0_50px_-8px_rgba(34,211,238,0.8)] hover:shadow-[0_0_80px_-4px_rgba(167,139,250,0.9)]"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
            <span className="relative">Заполнить анкету</span>
            <ArrowIcon />
          </MagneticCTA>

          <div className="flex flex-col items-center gap-3">
            <p className="text-sm text-slate-400">Или напишите напрямую:</p>
            <div className="flex flex-wrap items-center justify-center gap-5 text-sm font-medium">
              <TrackedLink
                href="https://t.me/dmitry_hihol"
                target="_blank"
                rel="noopener noreferrer"
                goalName="telegram_click"
                className="inline-flex items-center gap-2 text-cyan-400 transition-colors hover:text-cyan-300"
              >
                <TelegramIcon />
                <span>Telegram</span>
              </TrackedLink>

              <TrackedLink
                href="https://wa.me/79051238877"
                target="_blank"
                rel="noopener noreferrer"
                goalName="whatsapp_click"
                className="inline-flex items-center gap-2 text-cyan-400 transition-colors hover:text-cyan-300"
              >
                <WhatsAppIcon />
                <span>WhatsApp</span>
              </TrackedLink>

              <TrackedLink
                href="mailto:hihol.dmitry@ya.ru"
                goalName="email_click"
                className="inline-flex items-center gap-2 text-cyan-400 transition-colors hover:text-cyan-300"
              >
                <EmailIcon />
                <span>hihol.dmitry@ya.ru</span>
              </TrackedLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
