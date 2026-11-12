// Content stays visible unless observation and all recovery handlers are ready.
export function setupPageMotion(root: HTMLElement) {
  const revealSelector = '.glass-card, [data-scroll-reveal]'
  const cards = [...root.querySelectorAll<HTMLElement>(revealSelector)]
  const orb = root.querySelector<HTMLElement>('.study-orb')
  if (typeof window.matchMedia !== 'function') return () => {}

  const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  let observer: IntersectionObserver | undefined
  let orbObserver: IntersectionObserver | undefined
  let startupTimer: ReturnType<typeof setTimeout> | undefined
  let orbVisible = false
  let disposed = false

  function updateOrb() {
    orb?.classList.toggle('orb-active', orbVisible && !document.hidden && !preference.matches)
  }

  function clearEntrance(element: HTMLElement) {
    element.classList.remove('reveal-pending', 'reveal-enter')
    element.style.removeProperty('--reveal-delay')
  }

  function finishEntrance(event: AnimationEvent) {
    if (!(event.target instanceof HTMLElement)) return
    if (event.animationName === 'intro-appear') event.target.classList.remove('intro-enter')
    if (event.animationName === 'card-appear') clearEntrance(event.target)
  }

  function revealFocusedContent(event: FocusEvent) {
    if (!(event.target instanceof Element)) return
    const target = event.target.closest<HTMLElement>(`.intro-enter, ${revealSelector}`)
    if (!target) return
    target.classList.remove('intro-enter')
    if (target.matches(revealSelector)) {
      target.dataset.revealed = 'true'
      clearEntrance(target)
      observer?.unobserve(target)
    }
  }

  function stop() {
    clearTimeout(startupTimer)
    observer?.disconnect()
    orbObserver?.disconnect()
    observer = undefined
    orbObserver = undefined
    orbVisible = false
    updateOrb()
    cards.forEach(clearEntrance)
  }

  function failOpen() {
    stop()
    // Recovery is final for this visit: never hide previously exposed content.
    cards.forEach((card) => { card.dataset.revealed = 'true' })
  }

  function start() {
    stop()
    if (disposed) return
    if (preference.matches || typeof window.IntersectionObserver !== 'function') {
      failOpen()
      return
    }

    try {
      const pending = cards.filter((card) => !card.dataset.revealed)
      const awaitingInitialEntry = new Set(pending)

      observer = new IntersectionObserver((entries) => {
        if (disposed || preference.matches || !observer) return
        try {
          let batchIndex = 0
          for (const entry of entries) {
            const card = entry.target as HTMLElement
            awaitingInitialEntry.delete(card)
            // isIntersecting alone can be true before the threshold is reached.
            if (!entry.isIntersecting || entry.intersectionRatio < 0.12 || card.dataset.revealed) continue
            card.dataset.revealed = 'true'
            card.style.setProperty('--reveal-delay', `${Math.min(batchIndex++, 2) * 120}ms`)
            card.classList.remove('reveal-pending')
            card.classList.add('reveal-enter')
            observer.unobserve(card)
          }
          if (awaitingInitialEntry.size === 0) clearTimeout(startupTimer)
        } catch {
          failOpen()
        }
      }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' })

      // The decorative loop retains its original visibility boundary and timing.
      orbObserver = new IntersectionObserver((entries) => {
        if (disposed || preference.matches || !orbObserver) return
        try {
          orbVisible = entries.some((entry) => entry.isIntersecting)
          updateOrb()
        } catch {
          failOpen()
        }
      }, { threshold: 0.08 })
      if (orb) orbObserver.observe(orb)

      // If the browser never delivers the initial observations, reveal everything.
      if (pending.length) startupTimer = setTimeout(failOpen, 2000)
      for (const card of pending) {
        card.classList.add('reveal-pending')
        observer.observe(card)
      }
    } catch {
      failOpen()
    }
  }

  try {
    // Install recovery before adding any hidden states.
    root.addEventListener('animationend', finishEntrance)
    root.addEventListener('focusin', revealFocusedContent)
    preference.addEventListener('change', start)
    document.addEventListener('visibilitychange', updateOrb)
    window.addEventListener('error', failOpen)
    window.addEventListener('unhandledrejection', failOpen)
    start()
  } catch {
    failOpen()
  }

  return () => {
    disposed = true
    stop()
    root.removeEventListener('animationend', finishEntrance)
    root.removeEventListener('focusin', revealFocusedContent)
    preference.removeEventListener?.('change', start)
    document.removeEventListener('visibilitychange', updateOrb)
    window.removeEventListener('error', failOpen)
    window.removeEventListener('unhandledrejection', failOpen)
  }
}
