import React from 'react'
import { Car, BatteryCharging, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import './ServiceDetails.css'

export default function ServiceDetails({ vehicle, battery, charger }) {
  const hasItems = vehicle.length > 0 || battery.length > 0 || charger.length > 0

  if (!hasItems) {
    return (
      <div className="service-details-container empty">
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
      className="service-details-container"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <h3 className="section-title">Service Items</h3>
      <div className="items-grid">
        {vehicle.map(v => (
          <motion.div key={v.id} variants={itemVariant} className="item-card vehicle-card">
            <div className="card-header">
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-400" />
                <h4>Vehicle</h4>
              </div>
              <span className="status-badge">{v.status?.replace('_', ' ')}</span>
            </div>
            <div className="card-body">
              <p className="item-identity text-lg font-bold">{v.vehicle_make} {v.vehicle_model}</p>
              <p className="font-mono text-sm text-gray-400 mb-4">{v.vehicle_reg_no}</p>
              
              <div className="info-block">
                <p className="label">Initial Diagnosis</p>
                <p>{v.initial_diagnosis || 'Pending'}</p>
              </div>
              <div className="info-block mt-3">
                <p className="label">Repair Notes</p>
                <p>{v.repair_notes || 'No notes currently.'}</p>
              </div>
            </div>
          </motion.div>
        ))}

        {battery.map(b => (
          <motion.div key={b.id} variants={itemVariant} className="item-card battery-card">
            <div className="card-header">
              <div className="flex items-center gap-2">
                <BatteryCharging className="w-5 h-5 text-emerald-400" />
                <h4>Battery</h4>
              </div>
              <span className="status-badge">{b.status?.replace('_', ' ')}</span>
            </div>
            <div className="card-body">
              <p className="item-identity text-lg font-bold">Serial #{b.battery_records?.serial_number || 'Unknown'}</p>
              
              <div className="flex gap-4 mt-2 mb-4">
                <div className="metric-box">
                  <p className="label text-xs">Voltage</p>
                  <p className="font-mono">{b.initial_voltage || '-'}V</p>
                </div>
                <div className="metric-box">
                  <p className="label text-xs">Load Test</p>
                  <p className="font-bold">{b.load_test_result || 'Pending'}</p>
                </div>
              </div>

              <div className="info-block">
                <p className="label">Repair Type</p>
                <p className="capitalize">{b.repair_type?.replace('_', ' ') || 'Evaluation'}</p>
              </div>
              <div className="info-block mt-3">
                <p className="label">Technician Notes</p>
                <p>{b.technician_notes || 'No notes currently.'}</p>
              </div>
            </div>
          </motion.div>
        ))}

        {charger.map(c => (
          <motion.div key={c.id} variants={itemVariant} className="item-card charger-card">
            <div className="card-header">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                <h4>Charger</h4>
              </div>
              <span className="status-badge">{c.status?.replace('_', ' ')}</span>
            </div>
            <div className="card-body">
              <p className="item-identity text-lg font-bold">{c.charger_brand || 'Charger'}</p>
              <p className="font-mono text-sm text-gray-400 mb-4">{c.charger_serial_no}</p>

              <div className="info-block">
                <p className="label">Condition</p>
                <p>{c.condition_notes || 'Pending'}</p>
              </div>
              <div className="info-block mt-3">
                <p className="label">Repair Notes</p>
                <p>{c.repair_notes || 'No notes currently.'}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
