import Link from 'next/link'
import { EMAIL, TELEGRAM_CHANNEL_URL, TELEGRAM_URL } from '../lib/site'
import ContactIcon from './ContactIcon'

const PRIVACY_HREF = '/politika-obrabotki-personalnyh-dannyh'

type Variant = 'light' | 'dark'

const styles: Record<Variant, { footer: string; muted: string; link: string; privacy: string }> = {
  light: {
    footer:
      'border-t border-[color:var(--site-line)] bg-[var(--site-paper)] px-5 py-8 text-[var(--site-ink)] sm:px-8',
    muted: 'text-[var(--site-muted)]',
    link: 'inline-flex items-center gap-2 font-semibold hover:text-[var(--site-green)]',
    privacy: 'font-semibold underline underline-offset-4 hover:text-[var(--site-green)]',
  },
  dark: {
    footer: 'border-t border-white/10 bg-[#0b0d0a] px-5 py-8 text-white sm:px-8',
    muted: 'text-stone-400',
    link: 'inline-flex items-center gap-2 font-semibold hover:text-amber-200',
    privacy: 'font-semibold underline underline-offset-4 hover:text-amber-200',
  },
}

export default function SiteFooter({ variant = 'light' }: { variant?: Variant }) {
  const s = styles[variant]
  return (
    <footer className={s.footer}>
      <div className="mx-auto grid max-w-7xl gap-6 text-sm md:grid-cols-[1.2fr_1fr_1fr] md:items-end">
        <div>
          <p className="text-base font-semibold">HIHOL · Дмитрий Хихол</p>
          <p className={`mt-2 max-w-xl leading-relaxed ${s.muted}`}>
            AI-автоматизация бизнес-процессов под ключ: боты, RAG-системы,
            CRM-интеграции, Mini Apps, документы и серверные автоматизации.
          </p>
        </div>
        <div className={`grid gap-2 ${s.muted}`}>
          <p>Работаю удалённо по РФ и с русскоязычными командами.</p>
          <p>Самозанятый · НПД · ИНН 683306354810.</p>
          <p>Код, документация и контекст проекта передаются заказчику.</p>
          <p>Договор, NDA, реквизиты и чек НПД — по проекту.</p>
        </div>
        <div className="grid gap-2 md:justify-items-end">
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className={s.link}>
            <ContactIcon type="telegram" />
            Telegram
          </a>
          <a href={TELEGRAM_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className={s.link}>
            <ContactIcon type="telegram" />
            Telegram-канал
          </a>
          <a href={`mailto:${EMAIL}`} className={s.link}>
            <ContactIcon type="email" />
            {EMAIL}
          </a>
          <Link href={PRIVACY_HREF} className={s.privacy}>
            Политика обработки персональных данных
          </Link>
        </div>
      </div>
    </footer>
  )
}
