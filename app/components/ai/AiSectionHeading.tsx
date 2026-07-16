export default function AiSectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string
  title: string
  text?: string
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent-text)]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight sm:text-4xl">
        {title}
      </h2>
      {text && <p className="mt-4 text-lg leading-relaxed text-[var(--text-muted)]">{text}</p>}
    </div>
  )
}
