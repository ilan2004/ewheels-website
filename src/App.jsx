import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Process from './components/Process'
import Trust from './components/Trust'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import './index.css'
import './App.css'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="divider" />
        <Services />
        <div className="divider" />
        <Process />
        <div className="divider" />
        <Trust />
        <div className="divider" />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
