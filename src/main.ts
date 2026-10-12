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
