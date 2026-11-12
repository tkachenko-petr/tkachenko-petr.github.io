type SkillGroup = {
  id: string
  title: string
  icon: string
  skills: readonly string[]
}

const skillGroups: readonly SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Разработка интерфейсов',
    icon: 'M3 5h18v14H3zM3 9h18m-12 3-2 2 2 2m6-4 2 2-2 2',
    skills: ['React', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS 4', 'Vite'],
  },
  {
    id: 'tools',
    title: 'Инструменты разработки',
    icon: 'M6 7v10m0-3h7a5 5 0 0 0 5-5M6 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM18 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
    skills: ['Git', 'GitHub', 'ChatGPT', 'Codex'],
  },
  {
    id: 'quality',
    title: 'Тестирование и качество',
    icon: 'M20 11v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9m-7 8 4 4 9-10',
    skills: ['Vitest', 'Playwright', 'Проверка адаптивности', 'Сборка и проверка кода'],
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="skills-section" aria-labelledby="skills-title" tabIndex={-1}>
      <header className="skills-heading" data-scroll-reveal>
        <h2 id="skills-title">Мой инструментарий</h2>
        <p className="text-body text-muted">Технологии и инструменты, которые использую в практических проектах</p>
      </header>
      <div className="skills-grid">
        {skillGroups.map(({ id, title, icon, skills }) => (
          <div key={id} className="skill-card" data-scroll-reveal>
            <div className="skill-card-heading">
              <span className="skill-icon" aria-hidden="true">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d={icon} />
                </svg>
              </span>
              <h3>{title}</h3>
            </div>
            <ul className="skill-tags" role="list" aria-label={title}>
              {skills.map(skill => <li key={skill}>{skill}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
