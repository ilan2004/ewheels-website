import React, { useEffect, useRef } from 'react'
import './Process.css'

const STEPS = [
  {
    number: '01',
    title: 'Book Online',
    desc: 'Choose a time that suits you. Our booking system takes under two minutes.',
    icon: <CalendarIcon />,
  },
  {
    number: '02',
    title: 'Vehicle Inspection',
    desc: 'We perform a comprehensive diagnostic scan and health check on arrival.',
    icon: <ScanIcon />,
  },
  {
    number: '03',
    title: 'Expert Service',
    desc: 'Certified technicians carry out all approved work — no surprises.',
    icon: <ToolIcon />,
  },
  {
    number: '04',
    title: 'Ready to Go',
    desc: 'Your vehicle is returned fully serviced with a detailed digital report.',
    icon: <CheckIcon />,
  },
]

export default function Process() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.fade-in').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 100)
          })
        }
      }),
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="process" id="process" ref={sectionRef}>
      <div className="container">
        <div className="process__header fade-in">
          <span className="label">How It Works</span>
          <h2>From booking to<br />back on the road.</h2>
        </div>

        <div className="process__steps">
          {STEPS.map((step, i) => (
            <React.Fragment key={step.number}>
              <div className="process__step fade-in" id={`step-${step.number}`}>
                <div className="process__step-num">{step.number}</div>
                <div className="process__step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
              {i < STEPS.length - 1 && (
                <div className="process__connector fade-in" aria-hidden="true">
                  <div className="process__connector-line" />
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <circle cx="4" cy="4" r="3" fill="var(--green)" opacity="0.5"/>
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <path d="M16 2v4M8 2v4M3 10h18"/>
    </svg>
  )
}
function ScanIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2"/>
      <line x1="7" y1="12" x2="17" y2="12"/>
    </svg>
  )
}
function ToolIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/>
    </svg>
  )
}
function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}
