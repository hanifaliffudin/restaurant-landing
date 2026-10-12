import './index.css'
import './App.css'

const root = document.querySelector<HTMLDivElement>('#root')

if (import.meta.env.DEV && root?.childElementCount === 0) {
  void Promise.all([
    import('react'),
    import('react-dom/client'),
    import('./App'),
  ]).then(([{ createElement }, { createRoot }, { default: App }]) => {
    createRoot(root).render(createElement(App))
  })
}

const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle')
const navigation = document.querySelector<HTMLElement>('#primary-navigation')
const menuLabel = menuButton?.querySelector<HTMLElement>('span:first-child')
const menuIcon = menuButton?.querySelector<HTMLElement>('.menu-toggle__icon')

function setMenuOpen(open: boolean, returnFocus = false) {
  if (!menuButton || !navigation) return

  menuButton.setAttribute('aria-expanded', String(open))
  navigation.classList.toggle('is-open', open)
  menuIcon?.classList.toggle('is-open', open)
  if (menuLabel) menuLabel.textContent = open ? 'Close' : 'Menu'
  if (returnFocus) menuButton.focus()
}

menuButton?.addEventListener('click', () => {
  setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true')
})

navigation?.addEventListener('click', (event: MouseEvent) => {
  const target = event.target instanceof Element
    ? event.target.closest<HTMLAnchorElement>('a[href^="#"]')
    : null

  if (!target || menuButton?.getAttribute('aria-expanded') !== 'true') return

  setMenuOpen(false)
  const targetId = target.hash.slice(1)
  window.requestAnimationFrame(() => {
    const destination = document.getElementById(targetId)
    const heading = destination?.querySelector<HTMLElement>('h1, h2')
    const focusTarget = heading ?? destination
    focusTarget?.focus({ preventScroll: true })
  })
})

document.querySelectorAll<HTMLAnchorElement>('.brand').forEach((brand) => {
  brand.addEventListener('click', () => {
    if (menuButton?.getAttribute('aria-expanded') === 'true') setMenuOpen(false)
  })
})

document.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false, true)
  }
})

window.addEventListener('resize', () => {
  if (window.innerWidth > 720 && menuButton?.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false)
  }
})

function initializePageEnhancements() {
  const navigation = document.querySelector<HTMLElement>('#primary-navigation')
  const reserveBar = document.querySelector<HTMLElement>('.mobile-reserve')
  const main = document.querySelector<HTMLElement>('main')

  if (!navigation || !reserveBar || !main) return false
  if (navigation.dataset.enhancementsReady === 'true') return true
  navigation.dataset.enhancementsReady = 'true'

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const revealTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))

  if (!reduceMotion.matches && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('has-reveal-motion')
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        revealObserver.unobserve(entry.target)
      })
    }, { rootMargin: '0px 0px -36px 0px', threshold: 0.06 })

    revealTargets.forEach((target) => revealObserver.observe(target))
  } else {
    revealTargets.forEach((target) => target.classList.add('is-visible'))
  }

  const activeLinks = Array.from(
    navigation.querySelectorAll<HTMLAnchorElement>('a[href^="#"]:not(.nav-reserve)'),
  )
  const activeSections = activeLinks
    .map((link) => ({ link, section: document.getElementById(link.hash.slice(1)) }))
    .filter((item): item is { link: HTMLAnchorElement; section: HTMLElement } => item.section instanceof HTMLElement)

  if ('IntersectionObserver' in window && activeSections.length > 0) {
    const visibleSections = new Set<HTMLElement>()
    const navigationObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const section = entry.target as HTMLElement
        if (entry.isIntersecting) visibleSections.add(section)
        else visibleSections.delete(section)
      })

      const activeSection = Array.from(visibleSections)
        .sort((a, b) => Math.abs(a.getBoundingClientRect().top - innerHeight * 0.4)
          - Math.abs(b.getBoundingClientRect().top - innerHeight * 0.4))[0]

      activeLinks.forEach((link) => link.removeAttribute('aria-current'))
      if (!activeSection) return

      activeSections.find((item) => item.section === activeSection)?.link.setAttribute('aria-current', 'location')
    }, { rootMargin: '-18% 0px -62% 0px', threshold: 0 })

    activeSections.forEach(({ section }) => navigationObserver.observe(section))
  }

  const heroActions = document.querySelector<HTMLElement>('.hero__actions')
  const reservationDetails = document.querySelector<HTMLElement>('#reservations')
  const footer = document.querySelector<HTMLElement>('.site-footer')
  const mobileViewport = window.matchMedia('(max-width: 720px)')

  if (!heroActions || !reservationDetails || !footer) return true

  let heroActionsVisible = false
  let reservationVisible = false
  let footerVisible = false

  const isInViewport = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect()
    return rect.bottom > 0 && rect.top < innerHeight
  }

  heroActionsVisible = isInViewport(heroActions)
  reservationVisible = isInViewport(reservationDetails)
  footerVisible = isInViewport(footer)

  const updateReserveBar = () => {
    const shouldShow = mobileViewport.matches && !heroActionsVisible && !reservationVisible && !footerVisible
    reserveBar.classList.toggle('is-visible', shouldShow)
  }

  updateReserveBar()

  if ('IntersectionObserver' in window) {
    const reserveObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === heroActions) heroActionsVisible = entry.isIntersecting
        if (entry.target === reservationDetails) reservationVisible = entry.isIntersecting
        if (entry.target === footer) footerVisible = entry.isIntersecting
      })
      updateReserveBar()
    }, { rootMargin: '-4% 0px -4% 0px', threshold: 0.05 })

    reserveObserver.observe(heroActions)
    reserveObserver.observe(reservationDetails)
    reserveObserver.observe(footer)
  }

  mobileViewport.addEventListener('change', updateReserveBar)
  return true
}

if (!initializePageEnhancements()) {
  const enhancementWatcher = new MutationObserver(() => {
    if (initializePageEnhancements()) enhancementWatcher.disconnect()
  })
  enhancementWatcher.observe(document.body, { childList: true, subtree: true })
}
