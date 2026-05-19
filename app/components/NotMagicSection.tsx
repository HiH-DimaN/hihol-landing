const notDoing = [
  'Не обещаю “AI всё решит сам” без данных, процессов и ответственного человека.',
  'Не беру проект, где нужен просто модный бот без бизнес-задачи.',
  'Не прячу код, доступы и документацию внутри подрядчика.',
]

const doing = [
  'Сначала считаю потери и выбираю участок с понятной отдачей.',
  'Фиксирую объём, срок, цену и критерии сдачи до разработки.',
  'Передаю решение так, чтобы его можно было поддерживать дальше.',
]

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-2xl border border-stone-800/80 bg-[#151812]/70 p-6 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm leading-relaxed text-stone-300">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default function NotMagicSection() {
  return (
    <section
      id="boundaries"
      className="relative overflow-hidden bg-[#10130f] px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-5xl">
            Что я <span className="text-gradient-brand">не продаю</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-stone-300">
            Чем честнее рамки до старта, тем выше шанс, что проект окупится.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <List title="Не делаю" items={notDoing} />
          <List title="Делаю вместо этого" items={doing} />
        </div>
      </div>
    </section>
  )
}
