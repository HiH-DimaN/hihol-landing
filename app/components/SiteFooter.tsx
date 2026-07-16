import Link from 'next/link'
import { EMAIL, TELEGRAM_CHANNEL_URL, TELEGRAM_URL } from '../lib/site'
import ContactIcon from './ContactIcon'

const PRIVACY_HREF = '/politika-obrabotki-personalnyh-dannyh'

type Variant = 'light' | 'dark'
type Direction = 'compliance' | 'ai' | 'neutral'

const styles: Record<Variant, { footer: string; muted: string; link: string; privacy: string }> = {
  light: {
    footer: 'border-t border-[color:var(--site-line)] bg-[var(--site-paper)] px-5 py-8 text-[var(--site-ink)] sm:px-8',
    muted: 'text-[var(--site-muted)]',
    link: 'inline-flex items-center gap-2 font-semibold hover:text-[var(--accent-text)]',
    privacy: 'font-semibold underline underline-offset-4 hover:text-[var(--accent-text)]',
  },
  dark: {
    footer: 'border-t border-white/10 bg-[#0b1712] px-5 py-8 text-white sm:px-8',
    muted: 'text-slate-400',
    link: 'inline-flex items-center gap-2 font-semibold hover:text-emerald-200',
    privacy: 'font-semibold underline underline-offset-4 hover:text-emerald-200',
  },
}

const content: Record<Direction, { description: string; note: string }> = {
  compliance: {
    description: 'Технический аудит сайтов, форм, cookie, аналитики, чат-ботов и маршрутов персональных данных по 152-ФЗ.',
    note: 'Аудит носит характер технического экспертного заключения и не является юридической консультацией.',
  },
  ai: {
    description: 'AI-ассистенты, RAG, CRM-интеграции, Telegram Mini Apps, голосовые сценарии и автоматизация процессов.',
    note: 'Объём, этапы, критерии приёмки, права на код и порядок поддержки фиксируются до начала проекта.',
  },
  neutral: {
    description: 'HIHOL объединяет технический аудит цифровых контуров и разработку AI-автоматизации для бизнеса.',
    note: 'На сайте нет форм заявки. Яндекс.Метрика загружается только после явного согласия в cookie-баннере.',
  },
}

export default function SiteFooter({
  variant = 'light',
  direction = 'neutral',
}: {
  variant?: Variant
  direction?: Direction
}) {
  const s = styles[variant]
  const copy = content[direction]
  return (
    <footer className={s.footer}>
      <div className="mx-auto grid max-w-7xl gap-6 text-sm md:grid-cols-[1.2fr_1fr_1fr] md:items-end">
        <div>
          <p className="text-base font-semibold">HIHOL · Дмитрий Хихол</p>
          <p className={`mt-2 max-w-xl leading-relaxed ${s.muted}`}>{copy.description}</p>
        </div>
        <div className={`grid gap-2 ${s.muted}`}>
          <p>Работаю удалённо по РФ и с русскоязычными командами.</p>
          <p>Самозанятый · НПД · ИНН 683306354810.</p>
          <p>Договор, NDA, реквизиты и чек НПД — по проекту.</p>
        </div>
        <div className="grid gap-2 md:justify-items-end">
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className={s.link}><ContactIcon type="telegram" />Telegram</a>
          <a href={TELEGRAM_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className={s.link}><ContactIcon type="telegram" />Telegram-канал</a>
          <a href={`mailto:${EMAIL}`} className={s.link}><ContactIcon type="email" />{EMAIL}</a>
          <Link href="/" className={s.link}>Проверка 152-ФЗ</Link>
          <Link href="/ai" className={s.link}>AI-решения</Link>
          <Link href={PRIVACY_HREF} className={s.privacy}>Политика обработки данных</Link>
        </div>
      </div>
      <div className={`mx-auto mt-6 max-w-7xl text-xs leading-relaxed ${s.muted}`}>{copy.note}</div>
    </footer>
  )
}
