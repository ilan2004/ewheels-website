import React, { useState, useEffect } from 'react'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        {/* Logo */}
        <a href="#" className="navbar__logo">
          <span className="navbar__logo-mark">e</span>wheels
        </a>

        {/* Desktop nav */}
        <nav className="navbar__links">
          <a href="#services">Services</a>
          <a href="#process">How It Works</a>
          <a href="#trust">About</a>
        </nav>

        {/* CTA */}
        <a href="#cta" className="btn-primary navbar__cta">Book Service</a>

        {/* Mobile burger */}
        <button
          className={`navbar__burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          id="menu-toggle"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
        <a href="#process" onClick={() => setMenuOpen(false)}>How It Works</a>
        <a href="#trust" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#cta" className="btn-primary" onClick={() => setMenuOpen(false)}>Book Service</a>
      </div>
    </header>
  )
}
