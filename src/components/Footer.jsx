import React from 'react'
import './Footer.css'

const NAV_LINKS = [
  { label: 'Services',    href: '#services' },
  { label: 'How It Works', href: '#process' },
  { label: 'About',       href: '#trust' },
  { label: 'Book Service', href: '#cta' },
]

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms Of Use',   href: '#' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <a href="#" className="navbar__logo footer__logo">
              <img src="/splash.png" alt="Ewheels Logo" className="navbar__logo-img" />
            </a>
            <p>Specialist electric vehicle servicing<br />you can actually trust.</p>
          </div>

          {/* Nav */}
          <nav className="footer__nav">
            <span className="footer__nav-heading">Navigation</span>
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href}>{l.label}</a>
            ))}
          </nav>

          {/* Contact */}
          <div className="footer__contact">
            <span className="footer__nav-heading">Contact</span>
            <a href="mailto:hello@ewheels.io">hello@ewheels.io</a>
            <a href="tel:+447700000000">+44 7700 000 000</a>
            <p className="footer__address">12 Volt Lane, London, EC1A 1AA</p>
          </div>
        </div>

        <div className="divider" />

        {/* Bottom bar */}
        <div className="footer__bottom">
          <span className="footer__copy">© {year} Ewheels. All rights reserved.</span>
          <div className="footer__legal">
            {LEGAL_LINKS.map(l => (
              <a key={l.label} href={l.href}>{l.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
