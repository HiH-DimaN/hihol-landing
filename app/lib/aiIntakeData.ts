export const AI_INTAKE_PATH = '/ai-diagnostika'

export const AI_INTAKE_RESULTS = [
  'карта текущего процесса и узких мест;',
  'точки, где AI или обычная автоматизация действительно уместны;',
  'границы первого пилота и зависимости от данных;',
  'предварительный диапазон бюджета с явными допущениями.',
]

export const FREQUENCY_OPTIONS = [
  'до 5 раз в месяц',
  '1–5 раз в неделю',
  'ежедневно',
  'несколько раз в день',
  'пока не знаю',
] as const

export const TIME_SPENT_OPTIONS = [
  'до 2 часов в месяц',
  '2–8 часов в месяц',
  '1–5 часов в неделю',
  'более 5 часов в неделю',
  'пока не знаю',
] as const

export const BUDGET_OPTIONS = [
  'до 50 тыс. ₽',
  '50–150 тыс. ₽',
  '150–320 тыс. ₽',
  'больше 320 тыс. ₽',
  'пока не знаю',
] as const

// Context-specific wording of the diagnostic form. Keyed by the `ctx` query
// parameter; a page without an entry keeps the default questions. Every option
// listed here must also be accepted by backend/app/schemas.py.
export type IntakeOverride = {
  processHint: string
  resultHint: string
  frequencyLegend: string
  frequencyOptions: readonly string[]
  timeLegend: string
  timeOptions: readonly string[]
  toolsHint: string
  constraintsHint: string
}

export const INTAKE_OVERRIDES: Record<string, IntakeOverride> = {
  'avtomatizaciya-ucheta': {
    processHint:
      'Например: счета поставщиков приходят на почту и в личные кабинеты, бухгалтер вручную вносит их в 1С и сверяет с заказами. Опишите, где возникают задержки и ошибки.',
    resultHint:
      'Какой результат будет полезен: счета попадают в учет без ручного ввода, расхождения видны сразу, отчет собирается сам.',
    frequencyLegend: 'Сколько документов или операций проходит через процесс? *',
    frequencyOptions: [
      'до 100 в месяц',
      '100-1 000 в месяц',
      '1-10 тысяч в месяц',
      'больше 10 тысяч в месяц',
      'пока не знаю',
    ],
    timeLegend: 'Сколько ручного времени он занимает у сотрудников? *',
    timeOptions: [
      'до 10 часов в неделю',
      '10-40 часов в неделю',
      'больше 40 часов в неделю',
      'пока не знаю',
    ],
    toolsHint: 'Например: 1С, RetailCRM, Битрикс24, кабинеты Wildberries и Ozon, банк-клиент, Excel, почта.',
    constraintsHint:
      'Например: доступ к 1С только через обмен файлами, данные нельзя выносить за пределы компании, проводки подтверждает бухгалтер.',
  },
}

export function intakeOverrideFor(context: string | null): IntakeOverride | undefined {
  return context ? INTAKE_OVERRIDES[context] : undefined
}

export function aiIntakeHref(source: string, context?: string): string {
  const params = new URLSearchParams({ src: source })
  if (context) params.set('ctx', context)
  return `${AI_INTAKE_PATH}?${params.toString()}`
}
