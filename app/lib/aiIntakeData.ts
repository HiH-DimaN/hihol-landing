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

export function aiIntakeHref(source: string, context?: string): string {
  const params = new URLSearchParams({ src: source })
  if (context) params.set('ctx', context)
  return `${AI_INTAKE_PATH}?${params.toString()}`
}
