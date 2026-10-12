import { useEffect, useRef, useState, type MouseEvent } from 'react'
import './App.css'

const menuGroups = [
  {
    id: 'antipasti',
    name: 'To begin',
    dishes: [
      {
        name: 'Olives & warm focaccia',
        detail: 'Castelvetrano olives, rosemary oil, sea salt',
        price: '€8',
        mark: '01',
      },
      {
        name: 'Burrata di stagione',
        detail: 'Stone fruit, basil, grilled sourdough',
        price: '€13',
        mark: '02',
      },
    ],
  },
  {
    id: 'pasta',
    name: 'From the pasta pot',
    dishes: [
      {
        name: 'Tagliatelle al ragù',
        detail: 'Slow-cooked beef, tomato, a little Parmigiano',
        price: '€19',
        mark: '03',
      },
      {
        name: 'Ravioli di ricotta',
        detail: 'Lemon ricotta, brown butter, crisp sage',
        price: '€18',
        mark: '04',
      },
    ],
  },
  {
    id: 'dolci',
    name: 'Something sweet',
    dishes: [
      {
        name: 'Tiramisù della casa',
        detail: 'Espresso-soaked, cocoa-dusted, made for sharing',
        price: '€9',
        mark: '05',
      },
    ],
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!menuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const handlePrimaryNavigationClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const targetId = event.currentTarget.hash.slice(1)
    const shouldMoveFocus = menuOpen
    closeMenu()

    if (shouldMoveFocus) {
      window.requestAnimationFrame(() => {
        const destination = document.getElementById(targetId)
        const heading = destination?.querySelector<HTMLElement>('h1, h2')
        const focusTarget = heading ?? destination
        focusTarget?.focus({ preventScroll: true })
      })
    }
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>

      <div className="concept-banner" role="note">
        <span className="concept-banner__dot" aria-hidden="true" />
        A fictional restaurant concept · Menu and visit details are sample content
      </div>

      <header className="site-header">
        <a className="brand" href="#top" onClick={closeMenu}>
          <span className="brand__mark" aria-hidden="true">OS</span>
          <span className="brand__name">Osteria <i>Sera</i></span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          ref={menuButtonRef}
        >
          <span>{menuOpen ? 'Close' : 'Menu'}</span>
          <span className={`menu-toggle__icon${menuOpen ? ' is-open' : ''}`} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>

        <nav
          className={`primary-navigation${menuOpen ? ' is-open' : ''}`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          <a href="#story" onClick={handlePrimaryNavigationClick}>Our story</a>
          <a href="#menu" onClick={handlePrimaryNavigationClick}>The menu</a>
          <a href="#visit" onClick={handlePrimaryNavigationClick}>Visit</a>
          <a className="nav-reserve" href="#reservations" onClick={handlePrimaryNavigationClick}>
            Reserve a table <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero section-wrap" id="top" aria-labelledby="hero-title">
          <div className="hero__copy">
            <p className="eyebrow"><span>01</span> A table for the neighborhood</p>
            <h1 id="hero-title">Come as you are.<br /><em>Stay a little.</em></h1>
            <p className="hero__intro">
              A fictional little osteria for long lunches, shared plates, and one more story over the last glass.
            </p>
            <div className="hero__actions">
              <a className="button button--dark" href="#reservations">Reserve a table <span aria-hidden="true">↗</span></a>
              <a className="text-link" href="#menu">View the sample menu <span aria-hidden="true">↓</span></a>
            </div>
            <div className="hero__note">
              <span className="hero__note-line" aria-hidden="true" />
              <span>Good food, no rush.</span>
            </div>
          </div>
          <figure className="hero__image-frame">
            <picture className="hero__picture">
              <source
                type="image/avif"
                srcSet="/images/hero-table-480.avif 480w, /images/hero-table-720.avif 720w, /images/hero-table-800.avif 800w, /images/hero-table-1200.avif 1200w"
                sizes="(max-width: 720px) calc(100vw - 52px), 485px"
              />
              <img
                className="hero__image"
                src="/images/hero-table-480.jpg"
                srcSet="/images/hero-table-480.jpg 480w, /images/hero-table-720.jpg 720w, /images/hero-table-800.jpg 800w, /images/hero-table-1200.jpg 1200w"
                sizes="(max-width: 720px) calc(100vw - 52px), 485px"
                width="2600"
                height="3900"
                alt="A candlelit table set with Italian dishes, bread, and glasses of wine"
                fetchPriority="high"
                decoding="sync"
              />
            </picture>
            <figcaption className="photo-credit hero__credit">Photo: Liubov Ilchuk / Unsplash</figcaption>
            <div className="hero__image-stamp" aria-hidden="true">
              <span>Buona</span>
              <span>sera</span>
              <span className="stamp-star">✳</span>
            </div>
          </figure>
          <a className="hero__scroll" href="#story"><span aria-hidden="true">↓</span> Take a look around</a>
        </section>

        <section className="story section-wrap reveal-on-scroll" id="story" aria-labelledby="story-title" data-reveal>
          <div className="section-kicker"><span>02</span><span>Our little corner</span></div>
          <div className="story__layout">
            <figure className="story__image-frame">
              <picture className="responsive-picture">
                <source type="image/avif" srcSet="/images/interior-480.avif 480w, /images/interior-800.avif 800w, /images/interior-1100.avif 1100w" sizes="(max-width: 720px) calc(100vw - 40px), (max-width: 980px) 310px, 530px" />
                <img src="/images/interior-480.jpg" srcSet="/images/interior-480.jpg 480w, /images/interior-800.jpg 800w, /images/interior-1100.jpg 1100w" sizes="(max-width: 720px) calc(100vw - 40px), (max-width: 980px) 310px, 530px" width="2000" height="1333" alt="A warmly lit neighborhood restaurant with red walls and hanging lamps" loading="lazy" decoding="async" />
              </picture>
              <figcaption className="photo-credit">Photo: Gerrie van der Walt / Unsplash</figcaption>
            </figure>
            <div className="story__copy">
              <p className="eyebrow">An open door, a full table</p>
              <h2 id="story-title" tabIndex={-1}>The best evenings<br />are <em>shared.</em></h2>
              <p>Osteria Sera is a made-up neighborhood table inspired by the generous spirit of an Italian osteria: simple things, made with care, passed around without keeping score.</p>
              <p>Pull up a chair for a plate in the middle, a second pour, and nowhere else you need to be.</p>
              <a className="text-link" href="#visit">Find your way here <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>

        <section className="menu-section reveal-on-scroll" id="menu" aria-labelledby="menu-title" data-reveal>
          <div className="section-wrap menu-section__inner">
            <div className="section-kicker"><span>03</span><span>From our sample menu</span></div>
            <div className="menu-heading">
              <div>
                <p className="eyebrow">A little something for everyone</p>
                <h2 id="menu-title" tabIndex={-1}>Made for<br /><em>passing around.</em></h2>
              </div>
              <div className="menu-heading__aside">
                <span className="menu-heading__price-note">Example prices · EUR</span>
                <p className="menu-heading__note">Dish names and prices are fictional sample content for this concept page.</p>
              </div>
            </div>
            <div className="menu-list">
              {menuGroups.map((group) => (
                <div className="menu-category" key={group.id} role="group" aria-labelledby={`menu-category-${group.id}`}>
                  <div className="menu-category__heading">
                    <h3 id={`menu-category-${group.id}`}>{group.name}</h3>
                    <span>{String(group.dishes.length).padStart(2, '0')}</span>
                  </div>
                  {group.dishes.map((dish) => (
                    <article className="menu-item" key={dish.mark}>
                      <span className="menu-item__mark" aria-hidden="true">{dish.mark}</span>
                      <div className="menu-item__body">
                        <h4>{dish.name}</h4>
                        <p className="menu-item__detail">{dish.detail}</p>
                      </div>
                      <span className="menu-item__price" aria-label={`Sample price ${dish.price}`}>{dish.price}</span>
                    </article>
                  ))}
                </div>
              ))}
            </div>
            <div className="menu-footer-note">
              <span aria-hidden="true">✳</span>
              <p>In a real osteria, the menu changes with whatever's best today.</p>
              <span aria-hidden="true">✳</span>
            </div>
          </div>
        </section>

        <section className="gallery section-wrap reveal-on-scroll" aria-label="A glimpse of dinner at Osteria Sera" data-reveal>
          <div className="gallery__heading">
            <p className="eyebrow"><span>04</span> Pass the plate</p>
            <p>Something good<br />is always on the table.</p>
          </div>
          <figure className="gallery__photo gallery__photo--one">
            <picture className="responsive-picture">
              <source type="image/avif" srcSet="/images/pasta-480.avif 480w, /images/pasta-800.avif 800w, /images/pasta-1100.avif 1100w" sizes="(max-width: 720px) calc(50vw - 27px), 400px" />
              <img src="/images/pasta-480.jpg" srcSet="/images/pasta-480.jpg 480w, /images/pasta-800.jpg 800w, /images/pasta-1100.jpg 1100w" sizes="(max-width: 720px) calc(50vw - 27px), 400px" width="1600" height="2390" alt="A plate of fresh pasta finished with herbs and olive oil" loading="lazy" decoding="async" />
            </picture>
            <figcaption className="photo-credit">Photo: Youjeen Cho / Unsplash</figcaption>
          </figure>
          <figure className="gallery__photo gallery__photo--two">
            <picture className="responsive-picture">
              <source type="image/avif" srcSet="/images/ravioli-320.avif 320w, /images/ravioli-480.avif 480w, /images/ravioli-800.avif 800w" sizes="(max-width: 720px) calc(50vw - 27px), 400px" />
              <img src="/images/ravioli-320.jpg" srcSet="/images/ravioli-320.jpg 320w, /images/ravioli-480.jpg 480w, /images/ravioli-800.jpg 800w" sizes="(max-width: 720px) calc(50vw - 27px), 400px" width="1600" height="2000" alt="Fresh ravioli arranged on a plate with herbs and grated cheese" loading="lazy" decoding="async" />
            </picture>
            <figcaption className="photo-credit">Photo: Charles Deluvio / Unsplash</figcaption>
          </figure>
          <div className="gallery__handwritten" aria-hidden="true">piano,<br />piano <span>↗</span></div>
        </section>

        <section className="ordering reveal-on-scroll" id="ordering" aria-labelledby="ordering-title" data-reveal>
          <div className="ordering__inner section-wrap">
            <div className="ordering__mark" aria-hidden="true">OS</div>
            <div className="ordering__copy">
              <p className="eyebrow">For the nights in</p>
              <h2 id="ordering-title">Bring a little<br /><em>Sera home.</em></h2>
              <p>Picture the pasta, the good bread, and something sweet for later. Our ordering link is only a prototype in this demo.</p>
              <a className="button button--light" href="#ordering-details">See the ordering demo <span aria-hidden="true">↓</span></a>
            </div>
            <div className="ordering__image-wrap">
              <picture className="responsive-picture">
                <source type="image/avif" srcSet="/images/pasta-480.avif 480w, /images/pasta-800.avif 800w, /images/pasta-1100.avif 1100w" sizes="(max-width: 720px) calc(100vw - 40px), 600px" />
                <img src="/images/pasta-480.jpg" srcSet="/images/pasta-480.jpg 480w, /images/pasta-800.jpg 800w, /images/pasta-1100.jpg 1100w" sizes="(max-width: 720px) calc(100vw - 40px), 600px" width="1600" height="2390" alt="A close look at a freshly made pasta dish" loading="lazy" decoding="async" />
              </picture>
              <span className="photo-credit">Photo: Youjeen Cho / Unsplash</span>
            </div>
          </div>
        </section>

        <section className="visit section-wrap reveal-on-scroll" id="visit" aria-labelledby="visit-title" data-reveal>
          <div className="section-kicker"><span>05</span><span>Come by sometime</span></div>
          <div className="visit__layout">
            <div className="visit__heading">
              <p className="eyebrow">Location, hours & reservations</p>
              <h2 id="visit-title" tabIndex={-1}>There's a seat<br /><em>for you.</em></h2>
            </div>
            <div className="visit__details">
              <div className="visit-detail">
                <span className="visit-detail__label">Find us</span>
                <p>Location details<br /><span>To be added. This is a fictional restaurant.</span></p>
              </div>
              <div className="visit-detail">
                <span className="visit-detail__label">When we're open</span>
                <p>Opening hours<br /><span>To be added for this concept.</span></p>
              </div>
              <div className="visit-detail" id="reservations" tabIndex={-1}>
                <span className="visit-detail__label">Save your seat</span>
                <p>Reservations<br /><span>Prototype only. No booking is submitted.</span></p>
                <a className="text-link" href="#reservation-details">See reservation demo <span aria-hidden="true">↓</span></a>
              </div>
            </div>
          </div>
        </section>

        <section className="prototype-details reveal-on-scroll" aria-label="Prototype action details" data-reveal>
          <div className="prototype-detail" id="ordering-details" tabIndex={-1}>
            <span className="prototype-detail__icon" aria-hidden="true">↗</span>
            <div>
              <p className="eyebrow">Ordering demo</p>
              <h2>This link doesn't place an order.</h2>
              <p>Osteria Sera is a fictional concept. No order is submitted and no payment is collected.</p>
              <a className="text-link" href="#menu">Back to the sample menu <span aria-hidden="true">↑</span></a>
            </div>
          </div>
          <div className="prototype-detail" id="reservation-details" tabIndex={-1}>
            <span className="prototype-detail__icon" aria-hidden="true">✳</span>
            <div>
              <p className="eyebrow">Reservation demo</p>
              <h2>This link doesn't book a table.</h2>
              <p>No reservation is sent or held. Location and opening hours are sample placeholders for the concept.</p>
              <a className="text-link" href="#visit">Back to visit details <span aria-hidden="true">↑</span></a>
            </div>
          </div>
        </section>
      </main>

      <a className="mobile-reserve" href="#reservations" aria-label="Reserve a table. Prototype only, no booking is submitted.">
        <span className="mobile-reserve__copy">
          <span className="mobile-reserve__name">Osteria Sera</span>
          <span className="mobile-reserve__note">Prototype only · no booking is submitted</span>
        </span>
        <span className="mobile-reserve__action">Reserve a table <span aria-hidden="true">↗</span></span>
      </a>

      <footer className="site-footer">
        <div className="site-footer__top section-wrap">
          <a className="brand brand--footer" href="#top">
            <span className="brand__mark" aria-hidden="true">OS</span>
            <span className="brand__name">Osteria <i>Sera</i></span>
          </a>
          <p>A fictional little osteria.<br />A good evening, imagined.</p>
          <a className="text-link" href="#top">Back to top <span aria-hidden="true">↑</span></a>
        </div>
        <div className="site-footer__bottom section-wrap">
          <span>© 2026 Osteria Sera · Concept page</span>
          <span>Food & dining photography via <a href="https://unsplash.com/license" target="_blank" rel="noreferrer">Unsplash License</a></span>
        </div>
      </footer>
    </>
  )
}

export default App
