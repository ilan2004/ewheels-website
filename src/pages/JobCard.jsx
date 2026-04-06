import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Loader2, AlertCircle } from 'lucide-react'
import Timeline from '../components/JobCard/Timeline'
import ServiceDetails from '../components/JobCard/ServiceDetails'
import StepperProgress from '../components/JobCard/StepperProgress'
import PhotoGallery from '../components/JobCard/PhotoGallery'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"

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
    updates: [],
    photos: []
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
          { data: updatesData },
          { data: attachmentsData }
        ] = await Promise.all([
          supabase.from('vehicle_cases').select('*').eq('service_ticket_id', ticket.id),
          supabase.from('battery_cases').select(`*, battery_records(serial_number)`).eq('service_ticket_id', ticket.id),
          supabase.from('charger_cases').select('*').eq('service_ticket_id', ticket.id),
          supabase.from('ticket_status_updates').select('*').eq('ticket_id', ticket.id).order('created_at', { ascending: false }),
          supabase.from('ticket_attachments').select('*').eq('ticket_id', ticket.id).eq('attachment_type', 'photo')
        ])

        // Resolve image URLs using secure backend API
        const attachmentsArr = attachmentsData || []
        const cleanPaths = attachmentsArr.map(a => a.storage_path.replace(/^media-photos\//, ''))
        
        let signedUrlMap = {}
        if (cleanPaths.length > 0) {
          try {
            const apiRes = await fetch('/api/get-signed-urls', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ paths: cleanPaths })
            })
            
            if (apiRes.ok) {
              const { signedUrls } = await apiRes.json()
              if (signedUrls && Array.isArray(signedUrls)) {
                signedUrls.forEach(item => {
                  if (item.signedUrl) {
                    signedUrlMap[item.path] = item.signedUrl
                  }
                })
              }
            } else {
              console.error('API failed to generate signed URLs:', await apiRes.text())
            }
          } catch (e) {
            console.error('Failed to communicate with Vercel API:', e)
          }
        }

        const photos = attachmentsArr.map((attachment) => {
          const cleanPath = attachment.storage_path.replace(/^media-photos\//, '')
          
          // Get standard public URL natively just as a fallback
          const { data: pubData } = supabase.storage
            .from('media-photos')
            .getPublicUrl(cleanPath)
          
          return {
            ...attachment,
            url: signedUrlMap[cleanPath] || pubData.publicUrl,
            fallbackUrl: pubData.publicUrl
          }
        }).filter(Boolean)

        setData({
          ticket,
          vehicle: vehicleData || [],
          battery: batteryData || [],
          charger: chargerData || [],
          updates: updatesData || [],
          photos: photos.filter(Boolean)
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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-background">
        <Card className="max-w-md w-full border-destructive/50">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <AlertCircle className="w-10 h-10 text-destructive mb-4" />
            <h2 className="font-semibold mb-2">Error</h2>
            <p className="text-sm text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { ticket, vehicle, battery, charger, updates, photos } = data

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white text-foreground py-10 px-4 md:px-8 flex justify-center">
      <div className="w-full max-w-5xl flex flex-col gap-6">
        
        {/* Header & Status Card */}
        <Card className="shadow-sm border-border/70">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-semibold text-primary uppercase tracking-widest">E-Wheels Service</span>
                </div>
                <CardTitle className="text-2xl">Job Card {ticket.ticket_number}</CardTitle>
                <CardDescription>
                  Created on {new Date(ticket.created_at).toLocaleDateString()}
                </CardDescription>
              </div>
              <div className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-full tracking-wider uppercase">
                {ticket.status?.replace(/_/g, ' ')}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <StepperProgress currentStatus={ticket.status} />
            {ticket.due_date && (
              <p className="text-sm text-muted-foreground mt-2">
                Estimated completion: <span className="font-medium text-foreground">{new Date(ticket.due_date).toLocaleDateString()}</span>
              </p>
            )}
          </CardContent>
        </Card>

        {/* Customer Information Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Customer</p>
                <p className="text-base">{ticket.customers?.name || 'Unknown'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Contact</p>
                <p className="text-base font-mono">{ticket.customers?.phone || 'N/A'}</p>
              </div>
              <div className="col-span-1 md:col-span-2">
                <p className="text-sm font-medium text-muted-foreground mb-2">Reported Issues</p>
                <div className="flex flex-wrap gap-2">
                  {getComplaintsArray(ticket.customer_complaint).length > 0 ? (
                    getComplaintsArray(ticket.customer_complaint).map((complaint, i) => (
                      <div key={i} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm">
                        {complaint}
                      </div>
                    ))
                  ) : (
                    <span className="text-muted-foreground text-sm">No specific issues reported</span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Photo Gallery */}
        <PhotoGallery photos={photos} />

        {/* Details and Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ServiceDetails vehicle={vehicle} battery={battery} charger={charger} />
          </div>
          <div className="lg:col-span-1">
            <Timeline updates={updates} />
          </div>
        </div>

      </div>
    </div>
  )
}
