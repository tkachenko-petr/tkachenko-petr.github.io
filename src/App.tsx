import { useLayoutEffect, useRef, useState } from 'react'
import { AboutSection } from './components/AboutSection'
import { BrandMark } from './components/BrandMark'
import { ContactSection } from './components/ContactSection'
import { ProjectCard } from './components/ProjectCard'
import { SiteFooter } from './components/SiteFooter'
import { SiteNavigation } from './components/SiteNavigation'
import { SkillsSection } from './components/SkillsSection'
import { projects } from './data/projects'
import { setupPageMotion } from './motion'
import { applyTheme, getInitialTheme } from './theme'
import './App.css'

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 18 18 6M6 6h12v12"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}

function HeroArtwork() {
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="glass-card hero-art-main">
        <div className="hero-art-label"><span>СЛОИ ИНТЕРФЕЙСА</span><span>01 / UI</span></div>
        <div className="study-orb" />
        <svg className="hero-diagram" viewBox="0 0 400 265" fill="none">
          <path className="diagram-guide" d="M40 184 264 75M82 208 307 99M124 232 349 123M101 124 280 217M147 102 326 195M193 80 372 173" />
          <path className="diagram-layer diagram-back" d="M55 161 220 81 345 147 180 227Z" />
          <path className="diagram-layer diagram-middle" d="M55 135 220 55 345 121 180 201Z" />
          <path className="diagram-layer diagram-front" d="M55 107 220 27 345 93 180 173Z" />
          <g transform="matrix(.9 -.436 .88 .464 76 107)">
            <rect className="diagram-tile" width="160" height="110" rx="7" />
            <path className="diagram-detail" d="M0 22h160M66 33h80v63H66zM15 61h35m-35 12h26m-26 12h31" />
            <rect className="diagram-accent" x="14" y="33" width="38" height="15" rx="3" />
            <path className="diagram-detail" d="m77 84 18-17 12 9 25-30" />
            <circle className="diagram-accent" cx="15" cy="11" r="2.5" />
            <circle className="diagram-accent" cx="24" cy="11" r="2.5" />
          </g>
          <path className="diagram-guide" d="M55 107v54m125 12v54M345 93v54" />
          <circle className="diagram-accent" cx="55" cy="161" r="3" />
          <circle className="diagram-accent" cx="180" cy="227" r="3" />
          <circle className="diagram-accent" cx="345" cy="147" r="3" />
        </svg>
        <div className="hero-art-label hero-art-caption"><span>СТРУКТУРА</span><span>ФОРМА</span><span>ДЕТАЛИ</span></div>
      </div>
      <div className="glass-card hero-art-tile">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16" />
        </svg>
        <div><span>КОД</span><strong>React · TypeScript</strong></div>
      </div>
      <div className="glass-card hero-art-tile">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="4" width="16" height="12" rx="2" />
          <rect x="14" y="10" width="8" height="11" rx="2" fill="var(--surface)" />
        </svg>
        <div><span>ИНТЕРФЕЙС</span><strong>Адаптивность</strong></div>
      </div>
    </div>
  )
}

function App() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [theme, setTheme] = useState(getInitialTheme)
  const themeAction = theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'

  // Prepare hidden card states before the first paint, without hiding the page.
  useLayoutEffect(() => {
    if (pageRef.current) return setupPageMotion(pageRef.current)
  }, [])

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    applyTheme(nextTheme)
    setTheme(nextTheme)
  }

  return (
    <div className="design-page" ref={pageRef}>
      <a className="skip-link" href="#main">Перейти к содержимому</a>
      <div className="page-shell">
        <header className="site-header">
          <a href="#main" className="identity intro-enter intro-brand" aria-label="Ткаченко Пётр — к началу страницы">
            <BrandMark />
            <span className="identity-copy">
              <span className="identity-name">Ткаченко Пётр</span>
              <span className="identity-role">Веб-разработчик</span>
            </span>
          </a>
          <SiteNavigation />
          <div className="header-actions">
            <button
              type="button"
              className="theme-toggle"
              aria-label={themeAction}
              title={themeAction}
              onClick={toggleTheme}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                {theme === 'dark' ? (
                  <>
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
                  </>
                ) : (
                  <path d="M20.5 13.1A8.6 8.6 0 0 1 10.9 3.5a8.6 8.6 0 1 0 9.6 9.6Z" />
                )}
              </svg>
            </button>
          </div>
        </header>

        <main id="main" tabIndex={-1}>
          <section id="home" className="portfolio-hero" aria-labelledby="page-title" tabIndex={-1}>
            <div className="hero-copy">
              <h1 id="page-title">
                <span className="hero-title-part intro-enter intro-title">Создаю современные</span>{' '}
                <span className="hero-title-part intro-enter intro-title-accent">
                  <span className="hero-title-pair">сайты и</span>{' '}
                  <span className="hero-title-word hero-title-accent">веб-приложения</span>
                </span>
              </h1>
              <p className="hero-description text-body text-muted intro-enter intro-description">
                Адаптивные интерфейсы, продуманный дизайн и внимание к качеству каждой детали
              </p>
              <div className="hero-actions intro-enter intro-action">
                <a className="button button-primary" href="#projects">
                  Смотреть проекты <Arrow />
                </a>
                <a className="button button-secondary" href="https://github.com/tkachenko-petr" target="_blank" rel="noopener noreferrer">
                  GitHub <Arrow />
                </a>
              </div>
            </div>
            <HeroArtwork />
          </section>
          <section id="projects" className="projects-section" aria-labelledby="projects-title" tabIndex={-1}>
            <header className="projects-heading" data-scroll-reveal>
              <h2 id="projects-title">Избранные проекты</h2>
              <p className="text-body text-muted">Реальные примеры разработки и решения практических задач</p>
            </header>
            <div className="projects-list">
              {projects.map(project => <ProjectCard key={project.id} project={project} />)}
            </div>
          </section>
          <AboutSection />
          <SkillsSection />
          <ContactSection />
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}

export default App
