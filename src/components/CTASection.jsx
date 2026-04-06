import React, { useEffect, useRef, useState } from 'react'
import './CTASection.css'

export default function CTASection() {
  const sectionRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.fade-in').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 100)
          })
        }
      }),
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="cta-section" id="cta" ref={sectionRef}>
      <div className="container">
        <div className="cta-section__inner">

          <div className="cta-section__text fade-in">
            <span className="label">Get Started</span>
            <h2>Ready to book<br />your service?</h2>
            <p>
              Tell us about your vehicle and we'll confirm a slot within two hours.
              No commitment required — just a conversation.
            </p>
            <ul className="cta-section__perks">
              <PerkItem text="Free initial diagnostic call" />
              <PerkItem text="Transparent upfront pricing" />
              <PerkItem text="Pick-up & drop-off available" />
            </ul>
          </div>

          <div className="cta-section__form-wrap fade-in">
            {submitted ? (
              <div className="cta-section__success" id="booking-success">
                <div className="cta-section__success-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3>Booking Request Sent</h3>
                <p>We'll be in touch within 2 hours to confirm your slot.</p>
              </div>
            ) : (
              <form className="cta-form" onSubmit={handleSubmit} id="booking-form">
                <div className="cta-form__row">
                  <div className="cta-form__field">
                    <label htmlFor="name">Your Name</label>
                    <input type="text" id="name" placeholder="Alex Johnson" required />
                  </div>
                  <div className="cta-form__field">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" placeholder="alex@email.com" required />
                  </div>
                </div>
                <div className="cta-form__row">
                  <div className="cta-form__field">
                    <label htmlFor="vehicle">Vehicle Model</label>
                    <input type="text" id="vehicle" placeholder="e.g. Tesla Model 3" required />
                  </div>
                  <div className="cta-form__field">
                    <label htmlFor="service">Service Type</label>
                    <select id="service" required defaultValue="">
                      <option value="" disabled>Select a service</option>
                      <option value="repair">EV Repair</option>
                      <option value="battery">Battery Diagnostics</option>
                      <option value="charging">Charging Solutions</option>
                      <option value="software">Software & OTA</option>
                      <option value="other">Other / Not sure</option>
                    </select>
                  </div>
                </div>
                <div className="cta-form__field">
                  <label htmlFor="message">Additional Notes</label>
                  <textarea id="message" placeholder="Any symptoms or context that would help us prepare…" rows={3} />
                </div>
                <button type="submit" className="btn-primary cta-form__submit" id="book-submit-btn">
                  Send Booking Request
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}

function PerkItem({ text }) {
  return (
    <li className="cta-section__perk">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <polyline points="2 7 5.5 10.5 12 4" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {text}
    </li>
  )
}
