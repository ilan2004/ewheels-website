import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Process from '../components/Process'
import Trust from '../components/Trust'
import Footer from '../components/Footer'

export default function Home() {
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
      </main>
      <Footer />
    </>
  )
}
