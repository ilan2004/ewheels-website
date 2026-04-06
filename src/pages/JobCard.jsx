import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Loader2, AlertCircle, Wrench, PackageCheck, Truck, Ban } from 'lucide-react'
import Timeline from '../components/JobCard/Timeline'
import ServiceDetails from '../components/JobCard/ServiceDetails'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const getComplaintsArray = (complaintData) => {
  if (!complaintData) return [];
  if (Array.isArray(complaintData)) return complaintData;
  if (typeof complaintData === 'string') {
    try {
      if (complaintData.startsWith('[')) {
        const parsed = JSON.parse(complaintData);
        return Array.isArray(parsed) ? parsed : [complaintData];
      }
    } catch {
      return [complaintData];
    }
    return [complaintData];
  }
  return [];
};

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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-foreground bg-background">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground font-medium animate-pulse">Locating your job card...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-background">
        <Card className="max-w-md w-full border-destructive/20 bg-destructive/10">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <AlertCircle className="w-16 h-16 text-destructive mb-4" />
            <h2 className="text-2xl font-bold mb-2">Oops!</h2>
            <p className="text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { ticket, vehicle, battery, charger, updates } = data

  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 flex justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl flex flex-col gap-8"
      >
        <Card className="overflow-hidden border border-border/50 bg-card/50 backdrop-blur-md">
          <div className="p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">Job Card #{ticket.ticket_number}</h1>
                <p className="text-muted-foreground mt-1">Created on {new Date(ticket.created_at).toLocaleDateString()}</p>
              </div>
              <div className="bg-gradient-to-tr from-blue-600 to-violet-600 text-white px-4 py-1.5 rounded-full font-bold text-xs tracking-widest uppercase shadow-lg shadow-blue-500/20">
                E-Wheels
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 bg-muted/30 p-6 rounded-2xl border border-border/50">
              <div className="bg-background p-4 rounded-xl shadow-inner border border-border/50">
                {getStatusIcon(ticket.status)}
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Current Status</p>
                <h2 className="text-4xl font-black capitalize bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                  {ticket.status?.replace('_', ' ')}
                </h2>
                {ticket.due_date && (
                  <p className="mt-2 text-sm text-emerald-400 font-medium">
                    Estimated Completion: {new Date(ticket.due_date).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Card>

        <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Customer</p>
                <p className="text-xl font-medium">{ticket.customers?.name || 'Unknown'}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Contact</p>
                <p className="text-xl font-medium">{ticket.customers?.phone || 'N/A'}</p>
              </div>
              <div className="col-span-1 sm:col-span-2">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Reported Issues</p>
                <div className="flex flex-wrap gap-2">
                  {getComplaintsArray(ticket.customer_complaint).length > 0 ? (
                    getComplaintsArray(ticket.customer_complaint).map((complaint, i) => (
                      <span key={i} className="bg-secondary text-secondary-foreground px-4 py-1.5 rounded-full text-sm font-medium border border-border">
                        {complaint}
                      </span>
                    ))
                  ) : (
                    <span className="text-muted-foreground italic text-sm">No specific issues reported</span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ServiceDetails vehicle={vehicle} battery={battery} charger={charger} />
          </div>
          <div className="lg:col-span-1">
            <Timeline updates={updates} />
          </div>
        </div>

      </motion.div>
    </div>
  )
}
