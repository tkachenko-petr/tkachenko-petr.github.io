const highlights = [
  {
    title: 'Разработка',
    description: 'От идеи и макета до работающего интерфейса.',
    icon: 'm8 6-6 6 6 6m8-12 6 6-6 6m-2-15-4 18',
  },
  {
    title: 'Адаптивность',
    description: 'Удобная компоновка на смартфоне и компьютере.',
    icon: 'M9 17H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v3M6 20h3m4-9h7a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1m3 7h1',
  },
  {
    title: 'Проверка качества',
    description: 'Проверяю работу функций и удобство интерфейса.',
    icon: 'M20 11v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9m-7 8 4 4 9-10',
  },
]

export function AboutSection() {
  return (
    <section id="about" className="about-section" aria-labelledby="about-title" tabIndex={-1}>
      <header className="about-heading" data-scroll-reveal>
        <p className="about-eyebrow text-caption text-muted">Обо мне</p>
        <h2 id="about-title">Разработка с вниманием к деталям</h2>
      </header>
      <div className="about-grid">
        <div className="about-card about-bio text-body text-muted" data-scroll-reveal>
          <p><strong>Я — Ткаченко Пётр</strong>, развиваюсь в веб-разработке и создаю адаптивные сайты и веб-приложения.</p>
          <p>Работаю с React, TypeScript и современными инструментами разработки, включая ChatGPT и Codex. Уделяю внимание дизайну, удобству интерфейса, проверке функциональности и качеству реализации.</p>
          <p>Развиваю практические навыки веб-разработки, создавая собственные проекты — от идеи и проектирования интерфейса до тестирования и публикации готового результата. Постоянно изучаю новые технологии и совершенствую подход к разработке.</p>
        </div>
        <ul className="about-highlights" role="list">
          {highlights.map(({ title, description, icon }) => (
            <li className="about-card about-highlight" key={title} data-scroll-reveal>
              <span className="about-icon" aria-hidden="true">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d={icon} />
                </svg>
              </span>
              <div>
                <h3>{title}</h3>
                <p className="text-muted">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
