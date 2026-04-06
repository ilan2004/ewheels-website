import React from 'react'
import { Car, BatteryCharging, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function ServiceDetails({ vehicle, battery, charger }) {
  const hasItems = vehicle.length > 0 || battery.length > 0 || charger.length > 0

  if (!hasItems) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border rounded-xl border-dashed opacity-70">
        <p>No specific service items found for this Job Card.</p>
      </div>
    )
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <motion.div 
      className="flex flex-col gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="border-b pb-3">
        <h3 className="text-xl font-bold">Service Items</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vehicle.map(v => (
          <motion.div key={v.id} variants={itemVariant}>
            <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 relative z-10" />
              <CardHeader className="flex flex-row items-center justify-between bg-muted/30 pb-4">
                <CardTitle className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
                  <Car className="w-5 h-5 text-blue-400" />
                  Vehicle
                </CardTitle>
                <Badge variant="outline" className="capitalize">
                  {v.status?.replace('_', ' ')}
                </Badge>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-lg font-bold">{v.vehicle_make} {v.vehicle_model}</p>
                <p className="font-mono text-sm text-muted-foreground mb-6">{v.vehicle_reg_no}</p>
                
                <div className="bg-muted/30 p-4 rounded-xl text-sm">
                  <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Initial Diagnosis</p>
                  <p className="text-foreground/90">{v.initial_diagnosis || 'Pending'}</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-xl text-sm mt-3">
                  <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Repair Notes</p>
                  <p className="text-foreground/90">{v.repair_notes || 'No notes currently.'}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {battery.map(b => (
          <motion.div key={b.id} variants={itemVariant}>
            <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50 relative z-10" />
              <CardHeader className="flex flex-row items-center justify-between bg-muted/30 pb-4">
                <CardTitle className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
                  <BatteryCharging className="w-5 h-5 text-emerald-400" />
                  Battery
                </CardTitle>
                <Badge variant="outline" className="capitalize">
                  {b.status?.replace('_', ' ')}
                </Badge>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-lg font-bold">Serial #{b.battery_records?.serial_number || 'Unknown'}</p>
                
                <div className="flex gap-4 mt-3 mb-6">
                  <div className="bg-muted/30 p-3 rounded-lg flex-1">
                    <p className="text-xs text-muted-foreground mb-1 font-semibold uppercase">Voltage</p>
                    <p className="font-mono">{b.initial_voltage || '-'}V</p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-lg flex-1">
                    <p className="text-xs text-muted-foreground mb-1 font-semibold uppercase">Load Test</p>
                    <p className="font-bold">{b.load_test_result || 'Pending'}</p>
                  </div>
                </div>

                <div className="bg-muted/30 p-4 rounded-xl text-sm">
                  <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">Repair Type</p>
                  <p className="text-foreground/90 capitalize">{b.repair_type?.replace('_', ' ') || 'Evaluation'}</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-xl text-sm mt-3">
                  <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">Technician Notes</p>
                  <p className="text-foreground/90">{b.technician_notes || 'No notes currently.'}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {charger.map(c => (
          <motion.div key={c.id} variants={itemVariant}>
            <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50 relative z-10" />
              <CardHeader className="flex flex-row items-center justify-between bg-muted/30 pb-4">
                <CardTitle className="text-sm font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  Charger
                </CardTitle>
                <Badge variant="outline" className="capitalize">
                  {c.status?.replace('_', ' ')}
                </Badge>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-lg font-bold">{c.charger_brand || 'Charger'}</p>
                <p className="font-mono text-sm text-muted-foreground mb-6">{c.charger_serial_no}</p>

                <div className="bg-muted/30 p-4 rounded-xl text-sm">
                  <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">Condition</p>
                  <p className="text-foreground/90">{c.condition_notes || 'Pending'}</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-xl text-sm mt-3">
                  <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">Repair Notes</p>
                  <p className="text-foreground/90">{c.repair_notes || 'No notes currently.'}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
