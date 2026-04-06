import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import { CheckCircle2, Circle } from 'lucide-react'
import { motion } from 'framer-motion'
import './Timeline.css'

export default function Timeline({ updates }) {
  if (!updates || updates.length === 0) {
    return (
      <div className="timeline-container empty">
        <h3>Service Timeline</h3>
        <p>No updates yet.</p>
      </div>
    )
  }

  return (
    <div className="timeline-container">
      <h3>Service Timeline</h3>
      <div className="timeline-list">
        {updates.map((update, index) => {
          const isLast = index === updates.length - 1
          const isFirst = index === 0

          return (
            <motion.div 
              key={update.id} 
              className={`timeline-item ${isFirst ? 'active' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="timeline-icon-column">
                <div className="icon-wrapper">
                  {isFirst ? <CheckCircle2 className="w-5 h-5 text-blue-500" /> : <Circle className="w-5 h-5 text-gray-500" />}
                </div>
                {!isLast && <div className="timeline-line"></div>}
              </div>
              <div className="timeline-content">
                <h4 className="capitalize font-semibold text-lg">{update.status?.replace('_', ' ')}</h4>
                <p className="text-gray-400 text-sm mt-1">{update.update_text}</p>
                <p className="text-gray-500 text-xs mt-2 font-mono">
                  {new Date(update.created_at).toLocaleString()} ({formatDistanceToNow(new Date(update.created_at))} ago)
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
