import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import { CheckCircle2, Circle } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card } from "@/components/ui/card"

export default function Timeline({ updates }) {
  if (!updates || updates.length === 0) {
    return (
      <Card className="p-6 h-full flex flex-col justify-center items-center opacity-70 border-dashed">
        <p>No updates yet.</p>
      </Card>
    )
  }

  return (
    <Card className="p-6 h-full">
      <div className="border-b pb-4 mb-6">
        <h3 className="text-xl font-bold">Service Timeline</h3>
      </div>
      
      <div className="flex flex-col">
        {updates.map((update, index) => {
          const isLast = index === updates.length - 1
          const isFirst = index === 0

          return (
            <motion.div 
              key={update.id} 
              className="flex gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex flex-col items-center">
                <div className="bg-background rounded-full p-1 z-10 border border-border">
                  {isFirst ? <CheckCircle2 className="w-5 h-5 text-blue-500 bg-background" fill="currentColor" opacity={0.2} strokeOpacity={1} /> : <Circle className="w-5 h-5 text-muted-foreground" />}
                </div>
                {!isLast && <div className="w-[2px] grow bg-border my-1"></div>}
              </div>
              
              <div className="pb-8 pt-1">
                <h4 className={`capitalize font-semibold text-lg ${isFirst ? 'text-blue-400' : 'text-foreground'}`}>
                  {update.status?.replace('_', ' ')}
                </h4>
                <p className="text-muted-foreground text-sm mt-1">{update.update_text}</p>
                <p className="text-muted-foreground/60 text-xs mt-2 font-mono">
                  {new Date(update.created_at).toLocaleString()} ({formatDistanceToNow(new Date(update.created_at))} ago)
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </Card>
  )
}
