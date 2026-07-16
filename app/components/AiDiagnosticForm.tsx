'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import {
  BUDGET_OPTIONS,
  FREQUENCY_OPTIONS,
  TIME_SPENT_OPTIONS,
} from '../lib/aiIntakeData'
import { trackGoal } from '../lib/metrika'
import { TELEGRAM_URL } from '../lib/site'

const STEPS = ['Процесс', 'Объём', 'Контур', 'Контакты'] as const
const SAFE_SLUG = /^[a-z0-9_-]+$/

type FormValues = {
  process: string
  desired_result: string
  frequency: string
  time_spent: string
  current_tools: string
  constraints: string
  budget: string
  name: string
  contact: string
  company: string
  consent_personal: boolean
  website: string
}

type FieldErrors = Partial<Record<keyof FormValues, string>>
type SubmitStatus = 'idle' | 'sending' | 'success' | 'error'

const INITIAL_VALUES: FormValues = {
  process: '',
  desired_result: '',
  frequency: '',
  time_spent: '',
  current_tools: '',
  constraints: '',
  budget: '',
  name: '',
  contact: '',
  company: '',
  consent_personal: false,
  website: '',
}

const inputClass =
  'mt-2 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-[var(--text)] outline-none transition placeholder:text-slate-400 focus:border-[var(--accent-text)] focus:ring-2 focus:ring-teal-100'

function safeSlug(value: string | null, fallback: string, maxLength: number): string {
  if (!value || value.length > maxLength || !SAFE_SLUG.test(value)) return fallback
  return value
}

function validateProcessStep(values: FormValues): FieldErrors {
  const errors: FieldErrors = {}
  if (values.process.trim().length < 20) errors.process = 'Опишите процесс хотя бы в 20 символах.'
  if (values.desired_result.trim().length < 10) errors.desired_result = 'Опишите ожидаемый результат хотя бы в 10 символах.'
  return errors
}

function validateVolumeStep(values: FormValues): FieldErrors {
  const errors: FieldErrors = {}
  if (!values.frequency) errors.frequency = 'Выберите частоту или вариант «пока не знаю».'
  if (!values.time_spent) errors.time_spent = 'Выберите трудозатраты или вариант «пока не знаю».'
  return errors
}

function validateContextStep(values: FormValues): FieldErrors {
  return values.budget ? {} : { budget: 'Выберите диапазон или вариант «пока не знаю».' }
}

function validateContactStep(values: FormValues): FieldErrors {
  const errors: FieldErrors = {}
  if (values.name.trim().length < 2) errors.name = 'Укажите, как к вам обращаться.'
  if (values.contact.trim().length < 3) errors.contact = 'Укажите email, телефон или @username.'
  if (!values.consent_personal) errors.consent_personal = 'Без согласия отправить анкету нельзя.'
  return errors
}

const STEP_VALIDATORS = [
  validateProcessStep,
  validateVolumeStep,
  validateContextStep,
  validateContactStep,
] as const

function validateStep(step: number, values: FormValues): FieldErrors {
  return STEP_VALIDATORS[step]?.(values) ?? {}
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return <p id={id} className="mt-2 text-sm font-medium text-red-700" role="alert">{message}</p>
}

function TextAreaField({
  id,
  label,
  hint,
  value,
  maxLength,
  error,
  onChange,
}: {
  id: keyof FormValues
  label: string
  hint?: string
  value: string
  maxLength: number
  error?: string
  onChange: (value: string) => void
}) {
  const errorId = `${id}-error`
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-[var(--text)]">{label}</label>
      {hint && <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">{hint}</p>}
      <textarea
        id={id}
        name={id}
        value={value}
        maxLength={maxLength}
        rows={5}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      />
      <div className="mt-1 flex justify-between gap-4 text-xs text-[var(--text-muted)]">
        <FieldError id={errorId} message={error} />
        <span className="ml-auto">{value.length}/{maxLength}</span>
      </div>
    </div>
  )
}

function RadioGroup({
  name,
  legend,
  options,
  value,
  error,
  onChange,
}: {
  name: keyof FormValues
  legend: string
  options: readonly string[]
  value: string
  error?: string
  onChange: (value: string) => void
}) {
  const errorId = `${name}-error`
  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="text-sm font-semibold text-[var(--text)]">{legend}</legend>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label key={option} className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${value === option ? 'border-[var(--accent-text)] bg-teal-50 text-[var(--text)]' : 'border-[var(--border)] bg-white text-[var(--text-muted)] hover:border-slate-400'}`}>
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={(event) => onChange(event.target.value)}
              className="h-4 w-4 accent-teal-700"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      <FieldError id={errorId} message={error} />
    </fieldset>
  )
}

function ProcessStep({ values, errors, setValue }: StepProps) {
  return (
    <fieldset className="grid gap-6">
      <legend className="text-2xl font-semibold">Как устроен процесс сейчас</legend>
      <p className="text-sm leading-relaxed text-[var(--text-muted)]">Опишите один повторяющийся процесс. Не добавляйте персональные данные клиентов, пароли и содержимое конфиденциальных документов.</p>
      <TextAreaField id="process" label="Что происходит сейчас? *" hint="Кто запускает процесс, какие действия выполняются и где возникают задержки или ошибки." value={values.process} maxLength={2000} error={errors.process} onChange={(value) => setValue('process', value)} />
      <TextAreaField id="desired_result" label="Что должно измениться? *" hint="Какой наблюдаемый результат будет полезен: быстрее отвечать, не терять заявки, готовить документ, находить знания." value={values.desired_result} maxLength={1500} error={errors.desired_result} onChange={(value) => setValue('desired_result', value)} />
    </fieldset>
  )
}

function VolumeStep({ values, errors, setValue }: StepProps) {
  return (
    <fieldset className="grid gap-7">
      <legend className="text-2xl font-semibold">Объём и трудозатраты</legend>
      <p className="text-sm leading-relaxed text-[var(--text-muted)]">Диапазонов достаточно — точные цифры на этом этапе не нужны.</p>
      <RadioGroup name="frequency" legend="Как часто выполняется процесс? *" options={FREQUENCY_OPTIONS} value={values.frequency} error={errors.frequency} onChange={(value) => setValue('frequency', value)} />
      <RadioGroup name="time_spent" legend="Сколько ручного времени он занимает? *" options={TIME_SPENT_OPTIONS} value={values.time_spent} error={errors.time_spent} onChange={(value) => setValue('time_spent', value)} />
    </fieldset>
  )
}

function ContextStep({ values, errors, setValue }: StepProps) {
  return (
    <fieldset className="grid gap-6">
      <legend className="text-2xl font-semibold">Системы и ограничения</legend>
      <TextAreaField id="current_tools" label="Какие системы уже используются?" hint="Например: 1С, Bitrix24, amoCRM, Telegram, Excel, корпоративная база знаний." value={values.current_tools} maxLength={1000} error={errors.current_tools} onChange={(value) => setValue('current_tools', value)} />
      <TextAreaField id="constraints" label="Какие есть ограничения?" hint="Например: данные нельзя передавать во внешние AI-сервисы, нужен журнал действий или согласование человеком." value={values.constraints} maxLength={1000} error={errors.constraints} onChange={(value) => setValue('constraints', value)} />
      <RadioGroup name="budget" legend="Какой бюджет реалистично рассматривать? *" options={BUDGET_OPTIONS} value={values.budget} error={errors.budget} onChange={(value) => setValue('budget', value)} />
    </fieldset>
  )
}

function ContactStep({ values, errors, setValue }: StepProps) {
  return (
    <fieldset className="grid gap-5">
      <legend className="text-2xl font-semibold">Куда отправить предварительный разбор</legend>
      <div>
        <label htmlFor="name" className="text-sm font-semibold">Как к вам обращаться? *</label>
        <input id="name" name="name" value={values.name} maxLength={255} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} onChange={(event) => setValue('name', event.target.value)} className={inputClass} />
        <FieldError id="name-error" message={errors.name} />
      </div>
      <div>
        <label htmlFor="contact" className="text-sm font-semibold">Контакт для ответа *</label>
        <p className="mt-1 text-sm text-[var(--text-muted)]">Email, телефон или @username в Telegram.</p>
        <input id="contact" name="contact" value={values.contact} maxLength={255} autoComplete="email" aria-invalid={Boolean(errors.contact)} aria-describedby={errors.contact ? 'contact-error' : undefined} onChange={(event) => setValue('contact', event.target.value)} className={inputClass} />
        <FieldError id="contact-error" message={errors.contact} />
      </div>
      <div>
        <label htmlFor="company" className="text-sm font-semibold">Компания или проект</label>
        <input id="company" name="company" value={values.company} maxLength={255} autoComplete="organization" onChange={(event) => setValue('company', event.target.value)} className={inputClass} />
      </div>
      <label className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-white p-4 text-sm leading-relaxed text-[var(--text-muted)]">
        <input type="checkbox" name="consent_personal_ui" checked={values.consent_personal} onChange={(event) => setValue('consent_personal', event.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-teal-700" />
        <span>Я согласен(а) на обработку указанных данных для ответа на обращение в соответствии с <Link href="/politika-obrabotki-personalnyh-dannyh" className="font-semibold text-[var(--accent-text)] underline underline-offset-4">Политикой обработки персональных данных</Link>. *</span>
      </label>
      <FieldError id="consent-personal-error" message={errors.consent_personal} />
    </fieldset>
  )
}

type StepProps = {
  values: FormValues
  errors: FieldErrors
  setValue: (field: keyof FormValues, value: string | boolean) => void
}

function CurrentStep({ step, ...props }: StepProps & { step: number }) {
  if (step === 0) return <ProcessStep {...props} />
  if (step === 1) return <VolumeStep {...props} />
  if (step === 2) return <ContextStep {...props} />
  return <ContactStep {...props} />
}

async function sendLead(values: FormValues, source: string, context: string | null): Promise<number> {
  const response = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ...values, source, service_context: context }),
  })
  if (!response.ok) {
    const message = response.status === 429
      ? 'Слишком много попыток. Подождите несколько минут или напишите в Telegram.'
      : 'Не удалось сохранить анкету. Ответы остались на странице — попробуйте ещё раз.'
    throw new Error(message)
  }
  const result = await response.json() as { id?: number }
  if (typeof result.id !== 'number') {
    throw new Error('Сервис вернул некорректный ответ. Попробуйте ещё раз.')
  }
  return result.id
}

function useDiagnosticForm() {
  const params = useSearchParams()
  const source = safeSlug(params.get('src'), 'direct', 64)
  const context = safeSlug(params.get('ctx'), '', 96) || null
  const [step, setStep] = useState(0)
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [leadId, setLeadId] = useState<number | null>(null)

  const setValue: StepProps['setValue'] = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    if (status === 'error') setStatus('idle')
  }

  const goNext = () => {
    const nextErrors = validateStep(step, values)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }
    if (step === 0) trackGoal('ai_intake_start', { source, context })
    trackGoal('ai_intake_step', { source, context, step: step + 1 })
    setErrors({})
    setStep((current) => Math.min(current + 1, STEPS.length - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goBack = () => {
    setErrors({})
    setStep((current) => Math.max(0, current - 1))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'sending') return
    const nextErrors = validateStep(3, values)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setStatus('sending')
    setStatusMessage('')
    try {
      setLeadId(await sendLead(values, source, context))
      setStatus('success')
      trackGoal('ai_intake_submit_success', { source, context })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Не удалось отправить анкету.'
      setStatus('error')
      setStatusMessage(`${message} Можно продолжить напрямую в Telegram.`)
      trackGoal('ai_intake_submit_error', { source, context })
    }
  }

  return { step, values, errors, status, statusMessage, leadId, setValue, goNext, goBack, handleSubmit }
}

function ProgressHeader({ step }: { step: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p className="font-semibold text-[var(--accent-text)]">Шаг {step + 1} из {STEPS.length}</p>
        <p className="text-[var(--text-muted)]">Обычно 7–10 минут</p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--surface-2)]" role="progressbar" aria-label="Прогресс анкеты" aria-valuemin={1} aria-valuemax={STEPS.length} aria-valuenow={step + 1}>
        <div className="h-full rounded-full bg-[var(--accent)] transition-all" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
      </div>
      <ol className="mt-3 hidden grid-cols-4 gap-2 text-xs text-[var(--text-muted)] sm:grid">
        {STEPS.map((label, index) => <li key={label} className={index <= step ? 'font-semibold text-[var(--text)]' : ''}>{index + 1}. {label}</li>)}
      </ol>
    </div>
  )
}

function SuccessPanel({ leadId }: { leadId: number | null }) {
  return (
    <div className="rounded-2xl border border-teal-200 bg-teal-50 p-6 sm:p-8" role="status">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent-text)]">Анкета сохранена</p>
      <h2 className="mt-3 text-3xl font-semibold">Спасибо{leadId ? `, заявка №${leadId}` : ''}</h2>
      <p className="mt-4 leading-relaxed text-[var(--text-muted)]">Проверю ответы и свяжусь по указанному контакту. Если задача подходит для автоматизации, предварительный разбор покажет карту процесса, возможный первый пилот, зависимости и диапазон бюджета. Срок ответа подтвержу после просмотра анкеты.</p>
      <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--accent-text)] px-5 font-semibold text-[var(--accent-text)] hover:bg-white">Уточнить в Telegram</a>
    </div>
  )
}

function FailureNotice({ message }: { message: string }) {
  return (
    <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-800" role="alert">
      {message}{' '}
      <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">Открыть Telegram</a>
    </div>
  )
}

function FormNavigation({ step, consent, status, goBack, goNext }: {
  step: number
  consent: boolean
  status: SubmitStatus
  goBack: () => void
  goNext: () => void
}) {
  return (
    <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[var(--border)] pt-6 sm:flex-row sm:justify-between">
      {step > 0 ? <button type="button" onClick={goBack} className="min-h-12 rounded-xl border border-[var(--border)] px-5 font-semibold hover:border-slate-400">Назад</button> : <span />}
      {step < STEPS.length - 1 ? (
        <button type="button" onClick={goNext} className="min-h-12 rounded-xl bg-[var(--accent)] px-6 font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-strong)]">Продолжить</button>
      ) : (
        <button type="submit" disabled={!consent || status === 'sending'} className="min-h-12 rounded-xl bg-[var(--accent)] px-6 font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-50">{status === 'sending' ? 'Сохраняю…' : 'Отправить на разбор'}</button>
      )}
    </div>
  )
}

export default function AiDiagnosticForm() {
  const controller = useDiagnosticForm()
  if (controller.status === 'success') return <SuccessPanel leadId={controller.leadId} />

  return (
    <form onSubmit={controller.handleSubmit} noValidate className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm sm:p-8">
      <input type="text" name="website" value={controller.values.website} onChange={(event) => controller.setValue('website', event.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" />
      <ProgressHeader step={controller.step} />
      <CurrentStep step={controller.step} values={controller.values} errors={controller.errors} setValue={controller.setValue} />
      {controller.status === 'error' && <FailureNotice message={controller.statusMessage} />}
      <FormNavigation step={controller.step} consent={controller.values.consent_personal} status={controller.status} goBack={controller.goBack} goNext={controller.goNext} />
    </form>
  )
}
