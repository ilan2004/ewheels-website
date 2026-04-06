import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Loader2, AlertCircle, Wrench, PackageCheck, Truck, Ban } from 'lucide-react'
import Timeline from '../components/JobCard/Timeline'
import ServiceDetails from '../components/JobCard/ServiceDetails'
import { motion } from 'framer-motion'
import './JobCard.css'

export default function JobCard() {
  const { ticket_number } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState({
    ticket: null,
    vehicle: [],
    battery: [],
    charger: [],
    updates: []
  })

  useEffect(() => {
    async function fetchJobCardData() {
      try {
        setLoading(true)
        setError(null)

        // 1. Fetch main ticket + customer
        const { data: ticket, error: ticketError } = await supabase
          .from('service_tickets')
          .select(`
            *,
            customers ( name, phone )
          `)
          .eq('ticket_number', ticket_number)
          .single()

        if (ticketError) throw ticketError
        if (!ticket) throw new Error('Job Card not found')

        // 2. Fetch parallel service items
        const [
          { data: vehicleData },
          { data: batteryData },
          { data: chargerData },
          { data: updatesData }
        ] = await Promise.all([
          supabase.from('vehicle_cases').select('*').eq('service_ticket_id', ticket.id),
          supabase.from('battery_cases').select(`*, battery_records(serial_number)`).eq('service_ticket_id', ticket.id),
          supabase.from('charger_cases').select('*').eq('service_ticket_id', ticket.id),
          supabase.from('ticket_status_updates').select('*').eq('ticket_id', ticket.id).order('created_at', { ascending: false })
        ])

        setData({
          ticket,
          vehicle: vehicleData || [],
          battery: batteryData || [],
          charger: chargerData || [],
          updates: updatesData || []
        })

      } catch (err) {
        console.error('Error fetching job card data:', err)
        setError(err.message === 'Job Card not found' ? 'We could not find a Job Card matching this number.' : 'Failed to load Job Card details. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    if (ticket_number) {
      fetchJobCardData()
    }
  }, [ticket_number])

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'in_progress':
      case 'triaged':
        return <Wrench className="w-8 h-8 text-blue-500" />
      case 'completed':
        return <PackageCheck className="w-8 h-8 text-green-500" />
      case 'delivered':
        return <Truck className="w-8 h-8 text-purple-500" />
      case 'cancelled':
      case 'closed':
        return <Ban className="w-8 h-8 text-gray-500" />
      default:
        return <AlertCircle className="w-8 h-8 text-yellow-500" />
    }
  }

  const maskPhone = (phone) => {
    if (!phone) return 'N/A'
    if (phone.length <= 4) return phone
    return '*'.repeat(phone.length - 4) + phone.slice(-4)
  }

  if (loading) {
    return (
      <div className="jobcard-container loading">
        <Loader2 className="spinner" />
        <p>Locating your job card...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="jobcard-container error">
        <div className="error-card">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h2 className="text-xl font-bold">Oops!</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  const { ticket, vehicle, battery, charger, updates } = data

  return (
    <div className="jobcard-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="jobcard-wrapper"
      >
        <header className="jobcard-header">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Job Card #{ticket.ticket_number}</h1>
              <p className="text-gray-400 mt-1">Created on {new Date(ticket.created_at).toLocaleDateString()}</p>
            </div>
            <div className="brand-badge">E-Wheels</div>
          </div>

          <div className="status-hero mt-8">
            <div className="status-icon-wrapper">
              {getStatusIcon(ticket.status)}
            </div>
            <div>
              <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Current Status</p>
              <h2 className="text-4xl font-black mt-1 capitalize gradient-text">{ticket.status?.replace('_', ' ')}</h2>
              {ticket.due_date && (
                <p className="mt-2 text-sm text-green-400">
                  Estimated Completion: {new Date(ticket.due_date).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </header>

        <section className="customer-info-section">
          <div className="info-grid">
            <div>
              <p className="label">Customer</p>
              <p className="value">{ticket.customers?.name || 'Unknown'}</p>
            </div>
            <div>
              <p className="label">Contact</p>
              <p className="value">{maskPhone(ticket.customers?.phone)}</p>
            </div>
            <div className="col-span-full">
              <p className="label">Reported Issues</p>
              <ul className="issue-list">
                {ticket.customer_complaint?.map((complaint, i) => (
                  <li key={i}>{complaint}</li>
                )) || <li>No specific issues reported</li>}
              </ul>
            </div>
          </div>
        </section>

        <div className="details-layout">
          <div className="main-col">
            <ServiceDetails vehicle={vehicle} battery={battery} charger={charger} />
          </div>
          <div className="side-col">
            <Timeline updates={updates} />
          </div>
        </div>

      </motion.div>
    </div>
  )
}
