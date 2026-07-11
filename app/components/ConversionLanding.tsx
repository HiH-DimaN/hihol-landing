import { homeFaqs } from '../lib/faqs'
import {
  AD_MATCH_TITLE,
  pains,
  portfolio,
  reasons,
  statTargets,
  steps,
  techStackItems,
} from '../lib/homeData'
import {
  EMAIL,
  EXPRESS_FORM_URL,
  TELEGRAM_CHANNEL_URL,
  TELEGRAM_URL,
  WHATSAPP_PHONE,
} from '../lib/site'
import HomeCalculator from './HomeCalculator'
import HomeCaseProof from './HomeCaseProof'
import ContactIcon from './ContactIcon'
import HomeSectionTitle from './HomeSectionTitle'
import HomeServiceSwitcher from './HomeServiceSwitcher'
import SiteFooter from './SiteFooter'
import TrackedLink from './TrackedLink'

function LineIcon({ index }: { index: number }) {
  const paths = [
    <path key="a" d="M4 17h16M4 7h16M8 7v10M16 7v10" />,
    <path key="b" d="M5 12h14M12 5v14M7 7l10 10" />,
    <path key="c" d="M6 6h12v12H6zM9 9h6M9 13h4" />,
    <path key="d" d="M4 16l5-8 4 5 3-4 4 7" />,
    <path key="e" d="M7 5h10M7 12h10M7 19h10M4 5h.01M4 12h.01M4 19h.01" />,
    <path key="f" d="M12 4v16M5 9h14M7 15h10" />,
  ]
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[index % paths.length]}
    </svg>
  )
}

function HeroDossier() {
  return (
    <aside className="border border-[color:var(--site-line)] bg-white p-4 shadow-[12px_12px_0_rgba(28,31,28,0.06)] md:p-5">
      <div className="grid gap-4 sm:grid-cols-[132px_1fr]">
        <img
          src="/dmitry.jpg"
          alt="Дмитрий Хихол"
          className="h-40 w-32 object-cover grayscale"
          loading="eager"
        />
        <div>
          <h2 className="text-2xl font-semibold leading-tight">Дмитрий Хихол</h2>
          <p className="mt-2 text-sm font-semibold text-[var(--site-ink)]">
            20 лет CEO/COO/CCO · MBA
          </p>
          <p className="mt-1 text-sm font-semibold text-[var(--site-muted)]">
            40+ AI-решений в продакшне · OSS · Product Factory OS
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--site-muted)]">
            AI-разработчик с управленческим бэкграундом. Веду проект напрямую:
            от диагностики процесса до передачи кода.
          </p>
        </div>
      </div>
      <div className="mt-5 grid gap-2 border-t border-[color:var(--site-line)] pt-5 text-sm">
        <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-[var(--site-green)]">
          Telegram личка
        </a>
        <a href={TELEGRAM_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-[var(--site-green)]">
          Telegram-канал
        </a>
        <a href="https://github.com/hihol-labs" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-[var(--site-green)]">
          GitHub hihol-labs
        </a>
      </div>
    </aside>
  )
}

export default function ConversionLanding() {
  return (
    <main className="overflow-x-hidden bg-[var(--site-bg)] text-[var(--site-ink)]">
      <section id="top" className="min-h-screen border-b border-[color:var(--site-line)] px-5 py-5 sm:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-40px)] max-w-7xl flex-col">
          <header className="flex items-center justify-between border-b border-[color:var(--site-line)] pb-4">
            <a href="#top" className="flex min-h-11 items-center text-base font-semibold">HIHOL</a>
            <nav className="hidden items-center gap-6 text-sm text-[var(--site-muted)] md:flex" aria-label="Навигация">
              <a href="#services" className="flex min-h-11 items-center hover:text-[var(--site-ink)]">Услуги</a>
              <a href="#proof" className="flex min-h-11 items-center hover:text-[var(--site-ink)]">Доказательства</a>
              <a href="#calculator" className="flex min-h-11 items-center hover:text-[var(--site-ink)]">Расчёт</a>
              <a href="#contacts" className="flex min-h-11 items-center hover:text-[var(--site-ink)]">Контакты</a>
            </nav>
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center text-sm font-semibold text-[var(--site-green)]">Telegram</a>
          </header>

          <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[0.92fr_0.78fr] lg:gap-16">
            <div className="mx-auto w-full max-w-[700px] text-center lg:mx-0">
              <p className="hero-stagger text-sm font-semibold text-[var(--site-green)]" style={{ animationDelay: '0ms' }}>
                Процесс, экономика, внедрение
              </p>
              <h1 className="display-title hero-stagger mx-auto mt-5 max-w-4xl text-balance text-4xl leading-[1.05] sm:text-5xl md:text-6xl" style={{ animationDelay: '100ms' }}>
                {AD_MATCH_TITLE}
              </h1>
              <p className="hero-stagger mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--site-muted)] md:text-xl" style={{ animationDelay: '200ms' }}>
                Считаю потери, проектирую рабочий контур и запускаю AI-ботов,
                RAG-системы, CRM-интеграции, Mini Apps и автоматизацию
                документов за 1-3 недели.
              </p>
              <div className="hero-stagger mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:items-center" style={{ animationDelay: '300ms' }}>
                <TrackedLink
                  href={EXPRESS_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  goalName="questionnaire_cta_click"
                  goalPayload={{ service: 'Hero: бесплатный расчёт' }}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-[var(--site-ink)] px-5 py-3 text-base font-semibold text-white transition hover:bg-[var(--site-green)] sm:w-auto sm:px-7 sm:py-4"
                >
                  Получить бесплатный расчёт
                </TrackedLink>
                <a href="#services" className="min-h-11 border border-[color:var(--site-line)] bg-white px-5 py-3 text-center text-sm font-semibold text-[var(--site-ink)]">
                  Смотреть услуги
                </a>
              </div>
              <div className="hero-stagger mt-8 grid gap-0 border-y border-[color:var(--site-line)] text-sm sm:grid-cols-3" style={{ animationDelay: '400ms' }}>
                {['Фиксированная цена до старта', 'Код и документация ваши', '2 недели правок после запуска'].map((item) => (
                  <div key={item} className="border-b border-[color:var(--site-line)] py-3 text-center text-[var(--site-muted)] last:border-b-0 sm:border-b-0 sm:border-r sm:px-4 sm:last:border-r-0">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-stagger" style={{ animationDelay: '500ms' }}>
              <HeroDossier />
            </div>
          </div>
        </div>
      </section>

      <div className="border-b border-[color:var(--site-line)] bg-[var(--site-ink)] py-3 text-white">
        <div className="marquee-track flex gap-10 text-sm">
          {[...Array(6)].flatMap((_, copy) =>
            [
              'диагностика процесса',
              'карта данных',
              'CRM-интеграции',
              'контроль ошибок',
              'документация',
              'AI-боты',
              'передача кода',
              'парсинг данных',
              'RAG-системы',
              'техническое задание',
              'обучение команды',
              'Mini Apps',
            ].map((item) => (
              <span key={`${copy}-${item}`} className="whitespace-nowrap">{item}</span>
            )),
          )}
        </div>
      </div>

      <section id="problem" className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <HomeSectionTitle
            kicker="Боль / проблема"
            title="Где бизнес теряет заявки, время и контроль"
            text="AI-решения имеют смысл там, где медленный ответ, ручной перенос данных, разрозненные системы и отсутствие прозрачного контроля уже стоят денег."
          />
          <div className="mt-10 divide-y divide-[color:var(--site-line)] border-y border-[color:var(--site-line)]">
            {pains.map(([title, text], index) => (
              <article key={title} className="grid gap-4 py-6 md:grid-cols-[160px_0.7fr_1fr] md:items-start">
                <p className="text-sm font-semibold text-[var(--site-green)]">0{index + 1}</p>
                <h3 className="text-2xl font-semibold leading-tight">{title}</h3>
                <p className="leading-relaxed text-[var(--site-muted)]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="border-y border-[color:var(--site-line)] bg-[var(--site-paper)] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <HomeSectionTitle
            kicker="Решение"
            title="Кастомная разработка AI-решений для бизнеса"
            text="LLM-интеграции, Telegram-боты, Mini Apps, RAG-системы, SaaS, серверные автоматизации и интеграции с внешними сервисами."
          />
          <HomeServiceSwitcher />
        </div>
      </section>

      <section id="reasons" className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <HomeSectionTitle kicker="Почему выбирают HIHOL" title="Дисциплина внедрения" />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reasons.map(([title, text], index) => (
              <article key={title} className="border border-[color:var(--site-line)] bg-white p-6">
                <div className="text-[var(--site-green)]"><LineIcon index={index} /></div>
                <h3 className="mt-6 text-xl font-semibold">{title}</h3>
                <p className="mt-3 leading-relaxed text-[var(--site-muted)]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="border-y border-[color:var(--site-line)] bg-[var(--site-paper)] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <HomeSectionTitle kicker="Как это работает" title="4 шага: от потерь к рабочему контуру" />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map(([num, title, text]) => (
              <article key={title} className="border border-[color:var(--site-line)] bg-white p-6">
                <p className="display-title text-5xl text-[#b9ad99]">{num}</p>
                <h3 className="mt-8 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--site-muted)]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="proof" className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <HomeSectionTitle
            kicker="Социальное доказательство"
            title="Доказательства без театра: опыт, продукты, кейсы"
            text="Клиентские данные обезличены. Публичная часть доказательств: продукты, open-source, Telegram-канал и понятная экономика внедрения."
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <div className="grid grid-cols-2 gap-3">
                {statTargets.map((item) => (
                  <div key={item.label} className="border border-[color:var(--site-line)] bg-white p-5">
                    <div className="display-title text-3xl text-[var(--site-green)]">
                      {item.value}
                      {item.suffix}
                    </div>
                    <div className="mt-2 text-sm text-[var(--site-muted)]">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <HomeCaseProof />
          </div>

          <div className="relative left-1/2 mt-12 w-screen -translate-x-1/2 overflow-hidden border-y border-[color:var(--site-line)] bg-[var(--site-ink)] py-3 text-white">
            <div className="marquee-track flex gap-8 text-sm text-white" style={{ animationDuration: '140s' }}>
              {[...Array(4)].flatMap((_, copy) =>
                techStackItems.map((item, itemIndex) => (
                  <span key={`${copy}-${itemIndex}-${item}`} className="whitespace-nowrap">
                    {item}
                  </span>
                )),
              )}
            </div>
          </div>

          <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-2">
            {portfolio.map(([title, kind, text, href]) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col border border-[color:var(--site-line)] bg-white p-6 transition hover:border-[var(--site-ink)]"
              >
                <p className="text-sm font-semibold text-[var(--site-green)]">{kind}</p>
                <h3 className="mt-5 text-2xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--site-muted)] md:text-base">
                  {text}
                </p>
                <p className="mt-auto border-t border-[color:var(--site-line)] pt-3 text-sm font-semibold">
                  Смотреть проект
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="calculator" className="border-y border-[color:var(--site-line)] bg-[var(--site-paper)] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <HomeCalculator />
        </div>
      </section>

      <section id="faq" className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <HomeSectionTitle kicker="FAQ" title="Вопросы, которые нужно закрыть до старта" />
          <div className="mt-10 grid gap-3 lg:grid-cols-2 lg:items-start">
            {homeFaqs.map((item) => (
              <details key={item.q} className="group border border-[color:var(--site-line)] bg-white">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <span className="text-2xl leading-none text-[var(--site-green)] transition group-open:rotate-45">+</span>
                </summary>
                <div className="border-t border-[color:var(--site-line)] px-5 pb-5 pt-4 leading-relaxed text-[var(--site-muted)]">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="border-t border-[color:var(--site-line)] bg-[var(--site-ink)] px-5 py-20 text-white sm:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold text-[var(--site-gold)]">Финальный CTA</p>
            <h2 className="display-title mx-auto mt-3 max-w-5xl text-4xl leading-tight md:text-6xl">
              Получить расчёт потерь и план первого внедрения
            </h2>
            <p className="mx-auto mt-5 max-w-4xl text-lg leading-relaxed text-white/70">
              Заполните экспресс-анкету. На основании ответов подготовлю карту
              процесса, оценку потерь, предложения по автоматизации и план
              первого внедрения.
            </p>
            <div className="mt-9 grid gap-5 border-y border-white/20 py-7 text-sm text-white/75 sm:grid-cols-2 lg:grid-cols-4">
              {['Экспресс-анкета', 'Карта процесса', 'Оценка потерь', 'План внедрения'].map((item, index) => (
                <div key={item} className="relative flex min-h-28 flex-col items-center justify-center border border-white/20 px-4 py-5">
                  {index < 3 && (
                    <span className="absolute -right-6 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center bg-[var(--site-ink)] text-[var(--site-gold)] lg:flex">
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 12h15" />
                        <path d="m13 6 6 6-6 6" />
                      </svg>
                    </span>
                  )}
                  <div className="flex h-11 w-11 items-center justify-center border border-white/25 text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <span className="mt-3 font-semibold text-white">{item}</span>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-white/65">
              Если по анкете видно, что автоматизация не окупится или задачу
              проще закрыть без разработки, так и скажу до старта проекта.
            </p>
            <div className="mt-8 flex justify-center">
              <TrackedLink
                href={EXPRESS_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                goalName="questionnaire_cta_click"
                goalPayload={{ service: 'Финальный CTA: Google анкета' }}
                className="inline-flex min-h-14 w-full max-w-2xl items-center justify-center rounded-sm bg-[var(--site-gold)] px-8 py-4 text-base font-semibold text-[var(--site-ink)] transition hover:bg-[#d9b96f] focus:outline-none focus:ring-2 focus:ring-[var(--site-gold)]"
              >
                Открыть экспресс-анкету
              </TrackedLink>
            </div>
            <p className="mt-8 text-sm font-semibold text-white/70">Или напишите напрямую:</p>
            <div className="mx-auto mt-3 grid max-w-4xl gap-3 text-sm text-white/75 sm:grid-cols-3">
              <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/20 px-4 py-3 text-center font-semibold hover:bg-white/10">
                <ContactIcon type="telegram" />
                Telegram
              </a>
              <a href={`https://wa.me/${WHATSAPP_PHONE}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/20 px-4 py-3 text-center font-semibold hover:bg-white/10">
                <ContactIcon type="whatsapp" />
                WhatsApp
              </a>
              <a href={`mailto:${EMAIL}`} className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/20 px-4 py-3 text-center font-semibold hover:bg-white/10">
                <ContactIcon type="email" />
                {EMAIL}
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
