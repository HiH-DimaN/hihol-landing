import HeroFX from './HeroFX'
import ChatDemo from './ChatDemo'
import MagneticCTA from './MagneticCTA'
import TrustStrip from './TrustStrip'

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative isolate min-h-screen overflow-hidden px-6 pb-20 pt-28 md:pt-32 lg:py-24"
    >
      {/* aurora blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -left-32 top-1/4 h-[520px] w-[520px] rounded-full bg-cyan-500/25 blur-[140px] animate-aurora" />
        <div className="absolute -right-24 -top-24 h-[620px] w-[620px] rounded-full bg-violet-600/25 blur-[160px] animate-aurora-slow" />
        <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-fuchsia-500/20 blur-[120px] animate-aurora" />
      </div>

      {/* grid pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-grid bg-grid-fade opacity-80"
      />

      {/* interactive flow diagram + spotlight */}
      <HeroFX />

      {/* top hairline */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        {/* Left: copy + CTA */}
        <div className="flex flex-col items-center text-center lg:h-full lg:items-start lg:text-left">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse-soft" />
            AI Automation · 2026
          </div>

          <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
            Хватит управлять бизнесом через{' '}
            <span className="text-gradient-accent">звонки и Excel</span>
          </h1>

          <div className="mt-8 flex max-w-2xl flex-col gap-3 text-pretty text-lg leading-relaxed text-slate-300 md:text-xl">
            <p>AI-боты и автоматизация для компаний 10–100 человек.</p>
            <p>От первого созвона до работающей системы — 1–3 недели.</p>
            <p>Фиксированная цена, документация, поддержка.</p>
          </div>

          <div className="mt-12 flex flex-col items-center gap-4 lg:items-start">
            <MagneticCTA
              href="https://forms.gle/3QBDFKuK3DvGQm1n6"
              target="_blank"
              rel="noopener noreferrer"
              goalName="anketa_click"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-violet-500 px-8 py-4 text-base font-semibold text-slate-950 shadow-[0_0_40px_-8px_rgba(34,211,238,0.7)] hover:shadow-[0_0_60px_-4px_rgba(167,139,250,0.8)]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <span className="relative">
                Получить бесплатный расчёт потерь
              </span>
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
            </MagneticCTA>
            <p className="text-sm text-slate-400">
              Анкета 10 минут — в ответ PDF-отчёт
            </p>
          </div>

          <div className="mt-14 lg:mt-auto lg:pt-12">
            <TrustStrip />
          </div>
        </div>

        {/* Right: live chat demo */}
        <div className="w-full">
          <ChatDemo />
        </div>
      </div>

      {/* scroll hint */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-slate-500/40 p-1.5">
          <div className="h-1.5 w-1 rounded-full bg-slate-400/70 animate-float-slow" />
        </div>
      </div>
    </section>
  )
}
