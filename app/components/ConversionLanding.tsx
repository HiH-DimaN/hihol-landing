'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { faqs } from '../lib/faqs'
import { trackGoal } from '../lib/metrika'

const TELEGRAM_URL = 'https://t.me/dmitry_hihol'
const WHATSAPP_PHONE = '79051238877'
const EMAIL = 'hihol.dmitry@ya.ru'
const EXPRESS_FORM_URL = 'https://forms.gle/mXaG5vbff9BaSxHS6'
const AD_MATCH_TITLE = 'AI-автоматизация бизнес-процессов под ключ'

type ServiceId = 'assistant' | 'workflow' | 'miniapp' | 'voice' | 'docs' | 'parser'

const services: Array<{
  id: ServiceId
  name: string
  short: string
  fit: string
  result: string
  price: string
  duration: string
  specs: string[]
  flow: string[]
  tiers?: Array<{
    name: string
    price: string
    features: string[]
  }>
}> = [
  {
    id: 'assistant',
    name: 'AI-ассистент по базе знаний',
    short: 'AI-ассистенты и боты в трёх тарифах',
    fit: 'Когда сотрудники отвечают на одни и те же вопросы, а знания лежат в PDF, чатах и таблицах.',
    result: 'Клиент получает ответ быстрее, менеджер подключается только там, где нужен человек.',
    price: '50-320 тыс. ₽',
    duration: '5-21 день',
    specs: ['Start / Plus / Pro', 'Telegram и web-виджет', 'RAG по документам', 'аналитика вопросов'],
    flow: ['База знаний', 'Контроль ответа', 'Эскалация', 'Отчёт'],
    tiers: [
      {
        name: 'Start',
        price: '50-80 тыс. ₽',
        features: ['База знаний до 100 страниц', '1 канал: Telegram или виджет', '2 недели правок'],
      },
      {
        name: 'Plus',
        price: '120-180 тыс. ₽',
        features: ['RAG на 1000 документов', 'Telegram + виджет на сайте', 'Аналитика', '1 месяц поддержки'],
      },
      {
        name: 'Pro',
        price: '220-320 тыс. ₽',
        features: ['Всё из Plus', 'Интеграция amoCRM / Bitrix24 / 1С', 'Доп. CRM: +1-2 недели', 'Кастомные правила', '2 месяца поддержки'],
      },
    ],
  },
  {
    id: 'workflow',
    name: 'Автоматизация заявок и CRM',
    short: 'Формы, чаты, CRM, задачи, уведомления',
    fit: 'Когда лиды приходят из разных каналов, часть теряется, а руководитель видит процесс только постфактум.',
    result: 'Заявка быстро попадает в CRM, получает статус, ответственного и понятный следующий шаг.',
    price: '40-100 тыс. ₽',
    duration: '5-10 дней',
    specs: ['n8n / API', 'amoCRM / Bitrix24 / 1C', 'уведомления', 'контроль ошибок'],
    flow: ['Заявка', 'Квалификация', 'CRM', 'Сводка'],
  },
  {
    id: 'miniapp',
    name: 'Telegram Mini App',
    short: 'Каталог, кабинет или сервис внутри Telegram',
    fit: 'Когда клиенту неудобно переходить между сайтом, ботом, менеджером и личным кабинетом.',
    result: 'Сервис остаётся в канале общения: каталог, запись, кабинет, статусы и история действий.',
    price: '150-350 тыс. ₽',
    duration: '3-5 недель',
    specs: ['Auth Telegram', 'каталог / кабинет', 'БД', 'админ-панель', '1 месяц поддержки'],
    flow: ['Пользователь', 'Сценарий', 'База', 'Админка'],
  },
  {
    id: 'voice',
    name: 'Голосовой бот',
    short: 'Приём звонков, транскрипт, CRM',
    fit: 'Когда входящие звонки пропускаются, не фиксируются или требуют дорогой первой линии.',
    result: 'Звонок принят, смысл записан, карточка создана, сложный кейс передан оператору.',
    price: '200-400 тыс. ₽',
    duration: '3-4 недели',
    specs: ['SIP / АТС', 'STT + LLM + TTS', 'транскрипт', 'fallback оператору'],
    flow: ['Звонок', 'Смысл', 'Карточка', 'Контроль'],
  },
  {
    id: 'docs',
    name: 'Документы и отчёты',
    short: 'PDF, DOCX, XLSX, распознавание',
    fit: 'Когда сотрудники переносят данные из писем, фото и файлов в документы руками.',
    result: 'Документы выпускаются быстрее, поля проверяются, ошибки становятся видимыми.',
    price: '50-150 тыс. ₽',
    duration: '7-14 дней',
    specs: ['PDF / DOCX / XLSX', 'распознавание', 'шаблоны', 'проверка полей'],
    flow: ['Файл', 'Извлечение', 'Шаблон', 'Проверка'],
  },
  {
    id: 'parser',
    name: 'Парсинг данных',
    short: 'Сбор и структурирование данных',
    fit: 'Когда данные нужны регулярно, но сейчас их собирают вручную с сайтов, API, таблиц и личных кабинетов.',
    result: 'Данные очищаются, приводятся к структуре и попадают в таблицу, БД или отчёт по расписанию.',
    price: '50-150 тыс. ₽',
    duration: '7-14 дней',
    specs: ['Парсинг сайтов и API', 'Чистка данных', 'Запись в таблицы / БД', 'Расписание запусков'],
    flow: ['Источник', 'Парсер', 'Очистка', 'Таблица / БД'],
  },
]

const pains = [
  ['Потеря заявок', 'Клиент ждёт ответа, менеджер занят, данные о диалоге не попали в CRM. Лид уходит туда, где быстрее и понятнее.'],
  ['Ручные операции', 'Сотрудники копируют данные между чатами, таблицами, CRM и документами. Время уходит на перенос, а не на продажи и сервис.'],
  ['Нет управляемого контура', 'Процесс держится на людях и памяти: непонятно, где ошибка, кто отвечает, что делать при сбое и как проверить результат.'],
]

const reasons = [
  ['Операционный опыт', 'CEO/COO/CCO до AI. Разговор начинается с процесса, экономики и ответственности.'],
  ['Фиксация до кода', 'Сначала карта процесса, роли, данные, риски, цена и критерии приёмки. Потом разработка.'],
  ['Собственность клиента', 'Код, документация, инструкции и контекст проекта остаются у вас.'],
  ['Пилот 3 дня', 'Если после первых рабочих дней понятно, что не идём дальше, предоплата возвращается.'],
  ['Рабочий контур', 'Сразу закладываются логи, мониторинг, fallback, ручное вмешательство и обучение.'],
  ['Интеграции без тупиков', 'API, права доступа, логи, резервные сценарии и передача знаний проектируются так, чтобы систему можно было сопровождать.'],
]

const steps = [
  ['01', 'Диагностика', 'Анкета и созвон: где теряются деньги, часы и управляемость.'],
  ['02', 'Карта решения', 'Схема данных, интеграций, ролей, рисков и результата до разработки.'],
  ['03', 'Сборка', 'Рабочий контур на ваших данных, регулярные показы, фиксация вопросов.'],
  ['04', 'Запуск', 'Передача кода, документации, инструкции и 2 недели правок.'],
]

const cases = [
  {
    tag: 'E-commerce',
    title: 'AI-ассистент для интернет-магазина на Wildberries',
    problem: 'Потеря лидов 38% из-за долгого ответа (15 мин). Типовые вопросы по доставке, размерам и остаткам заваливают менеджеров.',
    solution: 'AI-чат на Vercel Serverless + OpenAI GPT-4o-mini. Типовые вопросы закрывает бот, редкие эскалирует на менеджера.',
    result: 'Выручка +31%, ответ 15 мин -> 40 сек, потеря лидов 38% -> 7%. ROI: 310%.',
  },
  {
    tag: 'Education',
    title: 'Онлайн-школа английского: AI + 1 куратор вместо 3',
    problem: '300+ студентов, 100+ сообщений/день, 30+ ДЗ/день. Кураторы выгорают, 15% студентов уходят из-за долгого ответа. Убыток 180к ₽/мес.',
    solution: 'AI-ассистент 24/7, автопроверка ДЗ, дашборд куратора с прогнозом риска отвала.',
    result: 'Retention 85% -> 92%, кураторы 3 -> 1, ответ 3 ч -> 3 сек. ROI: 842%, +3,5 млн ₽/год.',
  },
  {
    tag: 'Real estate',
    title: 'Агентство недвижимости: Telegram Mini App + AI',
    problem: 'Потолок 72 сделки/мес. Скорость ответа 7 мин — лиды уходят к конкурентам. Потеря лидов 32%.',
    solution: 'TMA с каталогом квартир, 3D-туры, AI-чат с семантическим поиском через PG Vector, дашборд агентства.',
    result: 'Сделки 72 -> 101/мес (+40%), ответ 7 мин -> 45 сек, потеря лидов 32% -> 9%. ROI: 360%.',
  },
]

const portfolio = [
  ['НейроЭксперт', 'В разработке', 'SaaS-платформа для экспертов и B2B. Для локального бизнеса — Local Sales OS: аудит видимости, карты, отзывы, конкуренты, потерянные лиды и ежедневные задачи роста заявок. Для экспертов — голосовой ответ превращается в SEO/AIO-страницы, которые приводят клиентов из поиска и нейросетей.', 'https://neuroexpertise.ru'],
  ['Skutr Docs', 'Открытая бета · сотни пользователей', 'Telegram-бот для генерации бизнес-документов из голоса, текста или фото. AI сам брифует клиента, собирает ТЗ и выдаёт готовый PDF: счёт, акт, КП или договор за 10 секунд. Для самозанятых и микробизнеса. Не бухгалтерия — только документы.', 'https://skutr.tech/'],
  ['idea-to-deploy', 'Open-source · MIT', 'Open-source методология для Claude Code: 25 навыков, 7 специализированных агентов, два quality gate и сохранение сессий. Использую как один из методологических контуров, чтобы архитектура, решения и контекст проекта оставались переносимыми.', 'https://github.com/hihol-labs/idea-to-deploy'],
  ['Product Factory OS', 'Методология · активно развивается', 'Codex-native методология и runtime: 32 скилла, 15 ролей агентов, контракты, маршрутизация задач, память проекта, quality gates, handoff и проверка результата. Помогает вести разработку системно, а не как набор разрозненных чатов.', 'https://github.com/hihol-labs/product-factory-os'],
]

const stackGroups = [
  ['AI/LLM', 'OpenAI API, Claude API, YandexGPT, GigaChat, LangChain, RAG, embeddings, function calling, prompt engineering, multi-agent systems, Whisper STT, AI agents.'],
  ['Backend', 'Python, FastAPI, Node.js, Pydantic, REST API, GraphQL, PostgreSQL, PG Vector, Supabase, Redis, Celery, Docker, Granian, mypy, Directus.'],
  ['Frontend / Telegram', 'Vue 3, React, Next.js, TypeScript, TailwindCSS, Telegram Bot API, aiogram, grammY, Telegram Mini App SDK, Telegram Login Widget, Vue Router, HTTP Axios, Lucide Vue.'],
  ['AI-native development', 'Claude Code, Codex, Cursor, GitHub, Git, Harness Engineering, Agentic Engineering, архитектура, ревью, тестирование, деплой, CI/CD.'],
  ['Инфраструктура', 'Docker, Nginx, Caddy, Vercel, VPS/Hetzner, Coolify, Minio S3, Task runner, ЮKassa, Resend.'],
]
const techStackItems = stackGroups.flatMap(([title, text]) => [
  title,
  ...text.replaceAll('.', '').split(',').map((item) => item.trim()).filter(Boolean),
])
const statTargets = [
  { value: 40, suffix: '+', label: 'AI-решений в продакшне' },
  { value: 20, suffix: ' лет', label: 'операционного опыта' },
  { value: 3, suffix: ' недели', label: 'типовой запуск' },
  { value: 14, suffix: ' дней', label: 'правок после старта' },
]
const tariffOptions = [
  { id: 'workflow', name: 'Заявки + CRM', base: 40000, recovery: 0.32 },
  { id: 'assistant', name: 'AI-ассистент Start', base: 50000, recovery: 0.22 },
  { id: 'miniapp', name: 'Mini App', base: 150000, recovery: 0.5 },
]

function rub(value: number) {
  return new Intl.NumberFormat('ru-RU').format(Math.max(0, Math.round(value)))
}

function ModalButton({
  children,
  service,
  className = '',
}: {
  children: React.ReactNode
  service?: string
  className?: string
}) {
  return (
    <a
      href={EXPRESS_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-service={service}
      onClick={() => trackGoal('questionnaire_cta_click', { service })}
      className={`inline-flex min-h-11 items-center justify-center rounded-sm bg-[var(--site-ink)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--site-green)] focus:outline-none focus:ring-2 focus:ring-[var(--site-gold)] ${className}`}
    >
      {children}
    </a>
  )
}

function SectionTitle({
  kicker,
  title,
  text,
}: {
  kicker: string
  title: string
  text?: string
}) {
  return (
    <div className="mx-auto w-full max-w-6xl border-b border-[color:var(--site-line)] pb-6 text-center">
      <p className="text-sm font-semibold text-[var(--site-green)]">{kicker}</p>
      <div>
        <h2 className="display-title mx-auto mt-3 max-w-5xl text-3xl leading-[1.12] text-[var(--site-ink)] md:text-4xl lg:text-5xl">
          {title}
        </h2>
        {text && <p className="mx-auto mt-4 max-w-4xl text-base leading-relaxed text-[var(--site-muted)] md:text-lg">{text}</p>}
      </div>
    </div>
  )
}

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
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[index % paths.length]}
    </svg>
  )
}

function ContactIcon({ type }: { type: 'telegram' | 'whatsapp' | 'email' }) {
  if (type === 'telegram') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 4 3 11l7 3 3 6 8-16Z" />
        <path d="m10 14 4-4" />
      </svg>
    )
  }
  if (type === 'whatsapp') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 19l1.2-3.4A7 7 0 1 1 9 18.5L5 19Z" />
        <path d="M9 8.8c.5 3 2.4 5 5.6 5.8" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

function HeroDossier() {
  return (
    <aside className="border border-[color:var(--site-line)] bg-white p-4 shadow-[12px_12px_0_rgba(28,31,28,0.06)] md:p-5">
      <div className="grid gap-4 sm:grid-cols-[132px_1fr]">
        <img src="/dmitry.jpg" alt="Дмитрий Хихол" className="h-40 w-32 object-cover grayscale" loading="eager" />
        <div>
          <h2 className="text-2xl font-semibold leading-tight">Дмитрий Хихол</h2>
          <p className="mt-2 text-sm font-semibold text-[var(--site-ink)]">
            20 лет CEO/COO/CCO · MBA
          </p>
          <p className="mt-1 text-sm font-semibold text-[var(--site-muted)]">
            40+ AI-решений в продакшне · OSS idea-to-deploy · Product Factory OS
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--site-muted)]">
            AI-разработчик с управленческим бэкграундом. Веду проект напрямую: от диагностики процесса до передачи кода.
          </p>
        </div>
      </div>
      <div className="mt-5 border-t border-[color:var(--site-line)] pt-5">
        <p className="text-xs font-semibold uppercase text-[var(--site-muted)]">Формат работы</p>
        <div className="mt-3 grid gap-0 text-sm">
          {[
            ['До кода', 'карта процесса, риски, критерии приёмки'],
            ['В разработке', 'рабочие показы и проверка на ваших данных'],
            ['После запуска', 'код, документация, инструкции, 2 недели правок'],
          ].map(([left, right]) => (
            <div key={left} className="grid grid-cols-[110px_1fr] border-t border-[color:var(--site-line)] py-3 first:border-t-0">
              <span className="font-semibold text-[var(--site-ink)]">{left}</span>
              <span className="text-[var(--site-muted)]">{right}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

function ServiceBrief({ service }: { service: (typeof services)[number] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="text-sm font-semibold text-[var(--site-green)]">{service.short}</p>
        <h3 className="display-title mt-2 text-3xl leading-tight">{service.name}</h3>
        <p className="mt-4 leading-relaxed text-[var(--site-muted)]">{service.fit}</p>
        <p className="mt-4 font-semibold leading-relaxed">{service.result}</p>
        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          {service.specs.map((spec) => (
            <div key={spec} className="border border-[color:var(--site-line)] bg-[#fbf9f3] px-3 py-2 text-sm text-[var(--site-muted)]">
              {spec}
            </div>
          ))}
        </div>
        {service.tiers && (
          <div className="mt-6 grid gap-3 lg:grid-cols-3">
            {service.tiers.map((tier) => (
              <div key={tier.name} className="flex h-full flex-col border border-[color:var(--site-line)] bg-[#fbf9f3] p-4">
                <h4 className="text-lg font-semibold">{tier.name}</h4>
                <ul className="mt-3 flex-1 space-y-2 text-sm leading-relaxed text-[var(--site-muted)]">
                  {tier.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-[color:var(--site-line)] pt-3 text-lg font-semibold">
                  {tier.price}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="border border-[color:var(--site-line)] bg-[#fbf9f3] p-4">
        <p className="text-xs font-semibold uppercase text-[var(--site-muted)]">Карта контура</p>
        <div className="mt-5 grid gap-3">
          {service.flow.map((item, index) => (
            <div key={item} className="grid grid-cols-[42px_1fr] items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center border border-[color:var(--site-line)] bg-white text-sm font-semibold">
                {index + 1}
              </div>
              <div className="border-l-2 border-[var(--site-green)] bg-white px-4 py-3 text-sm font-semibold">
                {item}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[color:var(--site-line)] pt-4 text-sm">
          <div>
            <p className="text-[var(--site-muted)]">Ориентир</p>
            <p className="mt-1 text-xl font-semibold">{service.price}</p>
          </div>
          <div>
            <p className="text-[var(--site-muted)]">Срок</p>
            <p className="mt-1 text-xl font-semibold">{service.duration}</p>
          </div>
        </div>
        <ModalButton service={`Услуга: ${service.name}`} className="mt-5 w-full">
          Получить расчёт
        </ModalButton>
      </div>
    </div>
  )
}

function Calculator() {
  const [tariff, setTariff] = useState(tariffOptions[0])
  const [requests, setRequests] = useState(220)
  const [check, setCheck] = useState(42000)
  const [hours, setHours] = useState(48)

  const result = useMemo(() => {
    const lostRevenue = requests * check * 0.12
    const manualCost = hours * 1100
    const monthlyEffect = lostRevenue * tariff.recovery + manualCost * 0.65
    const payback = monthlyEffect > 0 ? tariff.base / monthlyEffect : 0
    return { lostRevenue, manualCost, monthlyEffect, payback }
  }, [check, hours, requests, tariff])

  return (
    <div className="grid gap-8">
      <SectionTitle
        kicker="Оффер / калькулятор"
        title="Сначала порядок экономики, потом разработка"
        text="Это грубая модель для решения: есть ли смысл идти в проект. Точный расчёт делается после анкеты и доступа к исходным данным."
      />
      <div className="grid gap-6 lg:grid-cols-[0.78fr_1.05fr] lg:items-stretch">
        <aside className="h-full border border-[color:var(--site-line)] bg-white p-5 md:p-7">
          <p className="text-sm font-semibold text-[var(--site-green)]">Методика оценки</p>
          <h3 className="mt-3 text-2xl font-semibold leading-tight">Расчёт показывает порядок эффекта, а не обещание результата</h3>
          <p className="mt-4 leading-relaxed text-[var(--site-muted)]">
            Модель нужна, чтобы понять, есть ли экономический смысл идти в автоматизацию. Точные цифры появляются после экспресс-анкеты, карты процесса и проверки исходных данных.
          </p>
          <div className="mt-6 grid gap-3 text-sm">
            {[
              ['Входные данные', 'Вы задаёте объём заявок, средний чек и часы ручной работы. Это база для первичной оценки.'],
              ['Где теряются деньги', 'Калькулятор показывает, сколько денег может зависать в медленном ответе, ручной передаче и ошибках статусов.'],
              ['Что может вернуть автоматизация', 'Для каждого типа решения заложена разная доля эффекта: CRM, ассистент и Mini App закрывают разные части процесса.'],
              ['Окупаемость', 'Стоимость внедрения делится на ожидаемый месячный эффект. Так видно, стоит ли идти в проект сейчас.'],
            ].map(([title, text]) => (
              <div key={title} className="border-t border-[color:var(--site-line)] pt-3 first:border-t-0 first:pt-0">
                <p className="font-semibold">{title}</p>
                <p className="mt-1 leading-relaxed text-[var(--site-muted)]">{text}</p>
              </div>
            ))}
          </div>
        </aside>
        <div className="h-full border border-[color:var(--site-line)] bg-white p-5 md:p-7">
        <div className="grid gap-2 sm:grid-cols-3">
          {tariffOptions.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTariff(item)}
              className={`min-h-11 border px-3 py-3 text-left text-sm ${
                tariff.id === item.id
                  ? 'border-[var(--site-ink)] bg-[var(--site-ink)] text-white'
                  : 'border-[color:var(--site-line)] bg-white'
              }`}
            >
              <span className="block font-semibold">{item.name}</span>
              <span className="opacity-70">от {rub(item.base)} ₽</span>
            </button>
          ))}
        </div>
        <div className="mt-6 grid gap-5">
          <label className="grid gap-2 text-sm font-medium">
            Заявок в месяц
            <input type="range" min="50" max="1000" step="10" value={requests} onChange={(event) => setRequests(Number(event.target.value))} className="accent-[var(--site-green)]" />
            <input type="number" min="50" max="1000" value={requests} onChange={(event) => setRequests(Number(event.target.value))} className="min-h-11 border border-[color:var(--site-line)] px-3" />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Средний чек, ₽
            <input type="range" min="5000" max="300000" step="5000" value={check} onChange={(event) => setCheck(Number(event.target.value))} className="accent-[var(--site-green)]" />
            <input type="number" min="5000" step="1000" value={check} onChange={(event) => setCheck(Number(event.target.value))} className="min-h-11 border border-[color:var(--site-line)] px-3" />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Ручных часов в месяц
            <input type="number" min="0" value={hours} onChange={(event) => setHours(Number(event.target.value))} className="min-h-11 border border-[color:var(--site-line)] px-3" />
          </label>
        </div>
        <div className="mt-7 grid gap-4 border-t border-[color:var(--site-line)] pt-6 sm:grid-cols-3">
          <div><p className="text-sm text-[var(--site-muted)]">Потери / мес.</p><p className="mt-1 text-2xl font-semibold">{rub(result.lostRevenue + result.manualCost)} ₽</p></div>
          <div><p className="text-sm text-[var(--site-muted)]">Эффект / мес.</p><p className="mt-1 text-2xl font-semibold text-[var(--site-green)]">{rub(result.monthlyEffect)} ₽</p></div>
          <div><p className="text-sm text-[var(--site-muted)]">Окупаемость</p><p className="mt-1 text-2xl font-semibold">{result.payback.toFixed(1)} мес.</p></div>
        </div>
        <ModalButton service={`Калькулятор: ${tariff.name}`} className="mt-7 w-full">
          Получить точный расчёт
        </ModalButton>
        </div>
      </div>
    </div>
  )
}

export default function ConversionLanding() {
  const [activeService, setActiveService] = useState<ServiceId>('workflow')
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [statsStarted, setStatsStarted] = useState(false)
  const [stats, setStats] = useState(statTargets.map(() => 0))
  const statsRef = useRef<HTMLDivElement>(null)
  const service = services.find((item) => item.id === activeService) ?? services[0]

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightbox(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('modal-open', lightbox !== null)
    return () => document.body.classList.remove('modal-open')
  }, [lightbox])

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.15 })
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const node = statsRef.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setStatsStarted(true)
      observer.disconnect()
    }, { threshold: 0.3 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!statsStarted) return
    let raf = 0
    const started = performance.now()
    const tick = (time: number) => {
      const progress = Math.min(1, (time - started) / 900)
      setStats(statTargets.map((item) => Math.round(item.value * progress)))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [statsStarted])

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
                Считаю потери, проектирую рабочий контур и запускаю AI-ботов, RAG-системы, CRM-интеграции, Mini Apps и автоматизацию документов за 1-3 недели.
              </p>
              <div className="hero-stagger mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:items-center" style={{ animationDelay: '300ms' }}>
                <ModalButton service="Hero: бесплатный расчёт" className="w-full text-base sm:w-auto sm:px-7 sm:py-4">
                  Получить бесплатный расчёт
                </ModalButton>
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
          <SectionTitle
            kicker="Боль / проблема"
            title="Где бизнес теряет заявки, время и контроль"
            text="AI-решения имеют смысл там, где медленный ответ, ручной перенос данных, разрозненные системы и отсутствие прозрачного контроля уже стоят денег."
          />
          <div className="mt-10 divide-y divide-[color:var(--site-line)] border-y border-[color:var(--site-line)]">
            {pains.map(([title, text], index) => (
              <article key={title} data-reveal style={{ transitionDelay: `${index * 60}ms` }} className="grid gap-4 py-6 md:grid-cols-[160px_0.7fr_1fr] md:items-start">
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
          <SectionTitle
            kicker="Решение"
            title="Кастомная разработка AI-решений для бизнеса"
            text="LLM-интеграции, Telegram-боты, Mini Apps, RAG-системы, SaaS, серверные автоматизации и интеграции с внешними сервисами."
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-[330px_1fr]">
            <div className="grid gap-2">
              {services.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveService(item.id)}
                  className={`min-h-11 border px-4 py-3 text-left transition ${
                    activeService === item.id
                      ? 'border-[var(--site-ink)] bg-[var(--site-ink)] text-white'
                      : 'border-[color:var(--site-line)] bg-white text-[var(--site-ink)] hover:border-[var(--site-ink)]'
                  }`}
                >
                  <span className="block font-semibold">{item.name}</span>
                  <span className="mt-1 block text-sm opacity-70">{item.short}</span>
                </button>
              ))}
            </div>
            <article key={service.id} className="fade-in border border-[color:var(--site-line)] bg-white p-5 md:p-7">
              <ServiceBrief service={service} />
            </article>
          </div>
        </div>
      </section>

      <section id="reasons" className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle kicker="Почему выбирают HIHOL" title="Дисциплина внедрения" />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reasons.map(([title, text], index) => (
              <article key={title} data-reveal style={{ transitionDelay: `${index * 60}ms` }} className="border border-[color:var(--site-line)] bg-white p-6">
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
          <SectionTitle kicker="Как это работает" title="4 шага: от потерь к рабочему контуру" />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map(([num, title, text], index) => (
              <article key={title} data-reveal style={{ transitionDelay: `${index * 60}ms` }} className="border border-[color:var(--site-line)] bg-white p-6">
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
          <SectionTitle
            kicker="Социальное доказательство"
            title="Доказательства без театра: опыт, продукты, кейсы"
            text="Клиентские данные обезличены. Публичная часть доказательств: продукты, open-source и понятная экономика внедрения."
          />
          <div className="mt-10 grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <div ref={statsRef} className="grid grid-cols-2 gap-3">
                {statTargets.map((item, index) => (
                  <div key={item.label} className="border border-[color:var(--site-line)] bg-white p-5">
                    <div className="display-title text-3xl text-[var(--site-green)]">{stats[index]}{item.suffix}</div>
                    <div className="mt-2 text-sm text-[var(--site-muted)]">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              {cases.map((item, index) => (
                <article key={item.title} data-reveal style={{ transitionDelay: `${index * 60}ms` }} className="border border-[color:var(--site-line)] bg-white p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="bg-[#e5dece] px-3 py-1 text-sm font-semibold">{item.tag}</span>
                    <button type="button" onClick={() => setLightbox(index)} className="min-h-11 border border-[color:var(--site-line)] px-4 py-2 text-sm font-semibold hover:border-[var(--site-ink)]">Открыть досье</button>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--site-muted)]">{item.result}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative left-1/2 mt-12 w-screen -translate-x-1/2 overflow-hidden border-y border-[color:var(--site-line)] bg-[var(--site-ink)] py-3 text-white">
            <div className="marquee-track flex gap-8 text-sm text-white" style={{ animationDuration: '140s' }}>
              {[...Array(4)].flatMap((_, copy) =>
                techStackItems.map((item) => (
                  <span key={`${copy}-${item}`} className="whitespace-nowrap">
                    {item}
                  </span>
                )),
              )}
            </div>
          </div>

          <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-2">
            {portfolio.map(([title, kind, text, href], index) => (
              <a key={title} href={href} target="_blank" rel="noopener noreferrer" data-reveal style={{ transitionDelay: `${index * 60}ms` }} className="flex h-full flex-col border border-[color:var(--site-line)] bg-white p-6 transition hover:border-[var(--site-ink)]">
                <p className="text-sm font-semibold text-[var(--site-green)]">{kind}</p>
                <h3 className="mt-5 text-2xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--site-muted)] md:text-base">{text}</p>
                <p className="mt-auto border-t border-[color:var(--site-line)] pt-3 text-sm font-semibold">Смотреть проект</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="calculator" className="border-y border-[color:var(--site-line)] bg-[var(--site-paper)] px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Calculator />
        </div>
      </section>

      <section id="faq" className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle kicker="FAQ" title="Вопросы, которые нужно закрыть до старта" />
          <div className="mt-10 grid gap-3 lg:grid-cols-2 lg:items-start">
            {faqs.map((item) => (
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
            <h2 className="display-title mx-auto mt-3 max-w-5xl text-4xl leading-tight md:text-6xl">Получить расчёт потерь и план первого внедрения</h2>
            <p className="mx-auto mt-5 max-w-4xl text-lg leading-relaxed text-white/70">
              Заполните экспресс-анкету. На основании ответов подготовлю карту процесса, оценку потерь, предложения по автоматизации и план первого внедрения.
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
              Если по анкете видно, что автоматизация не окупится или задачу проще закрыть без разработки, так и скажу до старта проекта.
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href={EXPRESS_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGoal('questionnaire_cta_click', { service: 'Финальный CTA: Google анкета' })}
                className="inline-flex min-h-14 w-full max-w-2xl items-center justify-center rounded-sm bg-[var(--site-gold)] px-8 py-4 text-base font-semibold text-[var(--site-ink)] transition hover:bg-[#d9b96f] focus:outline-none focus:ring-2 focus:ring-[var(--site-gold)]"
              >
                Открыть экспресс-анкету
              </a>
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

      <footer className="border-t border-[color:var(--site-line)] bg-[var(--site-paper)] px-5 py-8 text-[var(--site-ink)] sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 text-sm md:grid-cols-[1.2fr_1fr_1fr] md:items-end">
          <div>
            <p className="text-base font-semibold">HIHOL · Дмитрий Хихол</p>
            <p className="mt-2 max-w-xl leading-relaxed text-[var(--site-muted)]">
              AI-автоматизация бизнес-процессов под ключ: боты, RAG-системы, CRM-интеграции, Mini Apps, документы и серверные автоматизации.
            </p>
          </div>
          <div className="grid gap-2 text-[var(--site-muted)]">
            <p>Работаю удалённо по РФ и с русскоязычными командами.</p>
            <p>Самозанятый · НПД · ИНН 683306354810.</p>
            <p>Код, документация и контекст проекта передаются заказчику.</p>
            <p>Договор, NDA, реквизиты и чек НПД — по проекту.</p>
          </div>
          <div className="grid gap-2 md:justify-items-end">
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold hover:text-[var(--site-green)]">
              <ContactIcon type="telegram" />
              Telegram
            </a>
            <a href={`https://wa.me/${WHATSAPP_PHONE}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold hover:text-[var(--site-green)]">
              <ContactIcon type="whatsapp" />
              WhatsApp
            </a>
            <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 font-semibold hover:text-[var(--site-green)]">
              <ContactIcon type="email" />
              {EMAIL}
            </a>
          </div>
        </div>
      </footer>

      {lightbox !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Кейс">
          <button type="button" className="absolute inset-0 bg-black/65" aria-label="Закрыть кейс" onClick={() => setLightbox(null)} />
          <article className="relative w-full max-w-3xl bg-white p-5 text-[var(--site-ink)] shadow-2xl md:p-7">
            <button type="button" aria-label="Закрыть" onClick={() => setLightbox(null)} className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-[color:var(--site-line)] bg-white text-2xl leading-none">×</button>
            <p className="text-sm font-semibold text-[var(--site-green)]">{cases[lightbox].tag}</p>
            <h2 className="display-title mt-3 pr-12 text-3xl leading-tight">{cases[lightbox].title}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ['Проблема', cases[lightbox].problem],
                ['Решение', cases[lightbox].solution],
                ['Результат', cases[lightbox].result],
              ].map(([title, text]) => (
                <div key={title} className="border border-[color:var(--site-line)] bg-[#fbf9f3] p-4">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--site-muted)]">{text}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      )}
    </main>
  )
}
