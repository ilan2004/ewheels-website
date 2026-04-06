import React, { useEffect, useRef } from 'react'
import './Services.css'

const SERVICES = [
  {
    id: 'ev-repair',
    icon: <WrenchIcon />,
    title: 'EV Repair',
    desc: 'Full-spectrum diagnostics and repair covering motor controllers, power electronics, and drivetrain components.',
    tag: 'Most popular',
  },
  {
    id: 'battery-diagnostics',
    icon: <BatteryIcon />,
    title: 'Battery Diagnostics',
    desc: 'In-depth cell analysis, State-of-Health reporting, and thermal management inspections for all major battery packs.',
  },
  {
    id: 'charging-solutions',
    icon: <ChargingIcon />,
    title: 'Charging Solutions',
    desc: 'Home charger installation, OCPP configuration, and troubleshooting for slow, fast, and rapid chargers.',
  },
  {
    id: 'software-updates',
    icon: <ChipIcon />,
    title: 'Software & OTA',
    desc: 'Firmware updates, ECU calibration, and compatibility patches to keep your vehicle running at peak performance.',
  },
]

export default function Services() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.fade-in').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 90)
          })
        }
      }),
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="services" id="services" ref={sectionRef}>
      <div className="container">
        <div className="services__header fade-in">
          <span className="label">What We Offer</span>
          <h2>Services built for<br />the modern EV owner.</h2>
          <p className="services__sub">
            Every service is carried out by certified EV technicians using manufacturer-grade tooling.
          </p>
        </div>

        <div className="services__grid">
          {SERVICES.map((s) => (
            <div className={`service-card fade-in ${s.tag ? 'service-card--featured' : ''}`} key={s.id} id={s.id}>
              <div className="service-card__icon">{s.icon}</div>
              {s.tag && <span className="service-card__tag">{s.tag}</span>}
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <a href="#cta" className="service-card__link">
                Learn more
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6h8M6.5 2.5L10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Icons ── */
function WrenchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3-3a1 1 0 000-1.4l-1.6-1.6A6 6 0 0014.7 6.3zM5 20.7a1 1 0 001.4 0L11 16l-3-3-4.6 4.6a1 1 0 00.3 1.4z"/>
    </svg>
  )
}
function BatteryIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="16" height="10" rx="2"/>
      <path d="M22 11v2M7 11h4m-2-2v4"/>
    </svg>
  )
}
function ChargingIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  )
}
function ChipIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="7" y="7" width="10" height="10" rx="1"/>
      <path d="M9 2v2m6-2v2M9 20v2m6-2v2M2 9h2m-2 6h2m18-6h-2m2 6h-2"/>
    </svg>
  )
}
