import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import JobCard from './pages/JobCard'
import './index.css'
import './App.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:ticket_number" element={<JobCard />} />
    </Routes>
  )
}
