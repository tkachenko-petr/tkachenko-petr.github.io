import { useEffect, useRef, useState } from 'react'

const sections = [
  { id: 'home', label: 'Главная' },
  { id: 'projects', label: 'Проекты' },
  { id: 'about', label: 'Обо мне' },
  { id: 'skills', label: 'Навыки' },
  { id: 'contacts', label: 'Контакты' },
]

export function SiteNavigation() {
  const [activeId, setActiveId] = useState(sections[0].id)
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const header = navRef.current?.closest('header')
    const targets = sections
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)
    const last = targets.at(-1)
    let frame = 0

    function updateActiveSection() {
      frame = 0
      const marker = (header?.getBoundingClientRect().bottom ?? 0) + 24
      let current = sections[0].id
      for (const target of targets) {
        if (target.getBoundingClientRect().top <= marker) current = target.id
      }

      // Keep the last navigation target active at the document end, including the footer.
      const viewportBottom = window.scrollY + window.innerHeight
      if (last && window.scrollY > 0 && viewportBottom >= document.documentElement.scrollHeight - 2) {
        current = last.id
      }
      setActiveId(current)
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection)
    }

    scheduleUpdate()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    window.addEventListener('hashchange', scheduleUpdate)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      window.removeEventListener('hashchange', scheduleUpdate)
    }
  }, [])

  return (
    <div
      className="site-navigation"
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false)
      }}
      onKeyDown={event => {
        if (event.key !== 'Escape' || !isOpen) return
        event.preventDefault()
        setIsOpen(false)
        buttonRef.current?.focus()
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        className="nav-toggle"
        aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={isOpen}
        aria-controls="site-navigation"
        onClick={() => setIsOpen(open => !open)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
          <path d={isOpen ? 'm6 6 12 12M18 6 6 18' : 'M4 7h16M4 12h16M4 17h16'} />
        </svg>
      </button>
      <nav ref={navRef} id="site-navigation" className="nav-panel" aria-label="Основная навигация" data-open={isOpen}>
        {sections.map(({ id, label }) => (
          <a key={id} href={`#${id}`} aria-current={activeId === id ? 'location' : undefined} onClick={() => setIsOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
    </div>
  )
}
