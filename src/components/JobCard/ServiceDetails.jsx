import React from 'react'
import { Car, BatteryCharging, Zap } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ServiceDetails({ vehicle, battery, charger }) {
  const hasItems = vehicle.length > 0 || battery.length > 0 || charger.length > 0

  if (!hasItems) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border rounded-lg border-dashed">
        <p className="text-sm text-muted-foreground">No specific service items found for this Job Card.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b pb-2">
        <h3 className="text-lg font-semibold tracking-tight">Service Items</h3>
      </div>
      
      <div className="flex flex-col gap-4">
        {vehicle.map(v => (
          <div key={v.id}>
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 bg-muted/20 border-b">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Car className="w-4 h-4 text-muted-foreground" />
                  Vehicle
                </CardTitle>
                <Badge variant="secondary" className="capitalize">
                  {v.status?.replace('_', ' ')}
                </Badge>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="font-semibold">{v.vehicle_make} {v.vehicle_model}</p>
                <p className="font-mono text-xs text-muted-foreground mb-4">{v.vehicle_reg_no}</p>
                
                <div className="grid gap-3">
                  <div className="text-sm">
                    <p className="font-medium text-muted-foreground mb-1">Initial Diagnosis</p>
                    <p>{v.initial_diagnosis || 'Pending'}</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-muted-foreground mb-1">Repair Notes</p>
                    <p>{v.repair_notes || 'No notes currently.'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}

        {battery.map(b => (
          <div key={b.id}>
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 bg-muted/20 border-b">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <BatteryCharging className="w-4 h-4 text-muted-foreground" />
                  Battery
                </CardTitle>
                <Badge variant="secondary" className="capitalize">
                  {b.status?.replace('_', ' ')}
                </Badge>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="font-semibold mb-3">Serial #{b.battery_records?.serial_number || 'Unknown'}</p>
                
                <div className="flex gap-4 mb-4 bg-muted/50 p-3 rounded-md border">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">Voltage</p>
                    <p className="text-sm font-mono">{b.initial_voltage || '-'}V</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">Load Test</p>
                    <p className="text-sm font-medium">{b.load_test_result || 'Pending'}</p>
                  </div>
                </div>

                <div className="grid gap-3 text-sm">
                  <div>
                    <p className="font-medium text-muted-foreground mb-1">Repair Type</p>
                    <p className="capitalize">{b.repair_type?.replace('_', ' ') || 'Evaluation'}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground mb-1">Technician Notes</p>
                    <p>{b.technician_notes || 'No notes currently.'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}

        {charger.map(c => (
          <div key={c.id}>
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 bg-muted/20 border-b">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Zap className="w-4 h-4 text-muted-foreground" />
                  Charger
                </CardTitle>
                <Badge variant="secondary" className="capitalize">
                  {c.status?.replace('_', ' ')}
                </Badge>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="font-semibold">{c.charger_brand || 'Charger'}</p>
                <p className="font-mono text-xs text-muted-foreground mb-4">{c.charger_serial_no}</p>

                <div className="grid gap-3 text-sm">
                  <div>
                    <p className="font-medium text-muted-foreground mb-1">Condition</p>
                    <p>{c.condition_notes || 'Pending'}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground mb-1">Repair Notes</p>
                    <p>{c.repair_notes || 'No notes currently.'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
