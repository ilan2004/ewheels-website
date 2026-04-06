import React, { useEffect, useRef } from 'react'
import './Trust.css'

const STATS = [
  { value: '2,400+', label: 'EVs Serviced' },
  { value: '98%',    label: 'Customer Satisfaction' },
  { value: '48 hr',  label: 'Avg. Turnaround' },
  { value: '6+',     label: 'Years Experience' },
]

const BRANDS = ['Tesla', 'Rivian', 'BMW i', 'Hyundai', 'Kia EV', 'Volkswagen']

const CERTS = [
  { title: 'IMI Certified', sub: 'EV Technician Level 3' },
  { title: 'OLEV Approved', sub: 'Charge Point Installer' },
  { title: 'ISO 9001', sub: 'Quality Management' },
]

export default function Trust() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.fade-in').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 80)
          })
        }
      }),
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="trust" id="trust" ref={sectionRef}>
      <div className="container">

        {/* Stats row */}
        <div className="trust__stats fade-in">
          {STATS.map((s) => (
            <div className="trust__stat" key={s.label}>
              <span className="trust__stat-value">{s.value}</span>
              <span className="trust__stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="divider trust__mid-divider" />

        {/* Two-col: certs + brands */}
        <div className="trust__cols">

          {/* Certifications */}
          <div className="trust__certs fade-in">
            <span className="label">Certifications</span>
            <div className="trust__cert-list">
              {CERTS.map((c) => (
                <div className="trust__cert" key={c.title}>
                  <ShieldIcon />
                  <div>
                    <strong>{c.title}</strong>
                    <span>{c.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="trust__brands fade-in">
            <span className="label">Brands We Service</span>
            <div className="trust__brand-grid">
              {BRANDS.map((b) => (
                <div className="trust__brand-pill" key={b}>{b}</div>
              ))}
            </div>
            <p className="trust__brand-note">
              Don't see your brand? We likely support it — get in touch.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>
  )
}
