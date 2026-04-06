import React, { useEffect, useRef } from 'react'
import './Hero.css'

export default function Hero() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    setTimeout(() => el && el.classList.add('hero--visible'), 80)
  }, [])

  return (
    <section className="hero" ref={ref} id="hero">
      <div className="container hero__grid">

        {/* Left — text */}
        <div className="hero__text">
          <span className="label">EV Service & Maintenance</span>
          <h1 className="hero__headline">
            Electric mobility,<br />
            <em>maintained simply.</em>
          </h1>
          <p className="hero__sub">
            Specialist care for your electric vehicle — from routine checks
            to battery diagnostics and charging solutions. Transparent,
            efficient, and built around your schedule.
          </p>
          <div className="hero__actions">
            <a href="#cta" className="btn-primary" id="hero-book-btn">
              Book Service
              <ArrowIcon />
            </a>
            <a href="#services" className="btn-outline" id="hero-services-btn">
              What We Do
            </a>
          </div>

          {/* Micro stats */}
          <div className="hero__stats">
            <StatItem value="2,400+" label="EVs Serviced" />
            <div className="hero__stat-div" />
            <StatItem value="48 hr" label="Average Turnaround" />
            <div className="hero__stat-div" />
            <StatItem value="100%" label="Certified Technicians" />
          </div>
        </div>

        {/* Right — visual */}
        <div className="hero__visual">
          <div className="hero__visual-bg" />
          <CarSilhouette />
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            Charging ready
          </div>
        </div>

      </div>
    </section>
  )
}

function StatItem({ value, label }) {
  return (
    <div className="hero__stat">
      <span className="hero__stat-value">{value}</span>
      <span className="hero__stat-label">{label}</span>
    </div>
  )
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function CarSilhouette() {
  return (
    <svg className="hero__car" viewBox="0 0 680 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Electric vehicle silhouette">
      {/* Body */}
      <path
        d="M80 200 C80 200 120 140 200 120 L340 110 L480 120 C540 130 590 160 610 200 L620 220 C620 220 560 230 340 230 C120 230 60 220 60 220 L80 200Z"
        fill="#2C2C2C"
        opacity="0.08"
      />
      {/* Cabin */}
      <path
        d="M200 120 C220 90 260 75 320 72 L400 72 C450 72 490 88 510 120"
        fill="none"
        stroke="#2C2C2C"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.12"
      />
      {/* Wheels */}
      <circle cx="160" cy="228" r="36" fill="#2C2C2C" opacity="0.1"/>
      <circle cx="160" cy="228" r="22" fill="var(--bg)" opacity="0.7"/>
      <circle cx="160" cy="228" r="8" fill="#2C2C2C" opacity="0.12"/>
      <circle cx="500" cy="228" r="36" fill="#2C2C2C" opacity="0.1"/>
      <circle cx="500" cy="228" r="22" fill="var(--bg)" opacity="0.7"/>
      <circle cx="500" cy="228" r="8" fill="#2C2C2C" opacity="0.12"/>
      {/* Charging bolt */}
      <path
        d="M348 44 L336 64 L346 64 L334 84 L352 60 L342 60 Z"
        fill="var(--green)"
        opacity="0.6"
      />
      {/* Ground line */}
      <line x1="40" y1="264" x2="640" y2="264" stroke="var(--border)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}
