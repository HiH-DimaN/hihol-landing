export default function HomeSectionTitle({
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
        {text && (
          <p className="mx-auto mt-4 max-w-4xl text-base leading-relaxed text-[var(--site-muted)] md:text-lg">
            {text}
          </p>
        )}
      </div>
    </div>
  )
}
