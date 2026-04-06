import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import { CheckCircle2, Circle } from 'lucide-react'
import { Card } from "@/components/ui/card"

export default function Timeline({ updates }) {
  if (!updates || updates.length === 0) {
    return (
      <Card className="p-6 h-full flex flex-col justify-center items-center border-dashed shadow-none bg-muted/10">
        <p className="text-sm text-muted-foreground">No updates yet.</p>
      </Card>
    )
  }

  return (
    <Card className="p-6 h-full shadow-sm">
      <div className="border-b pb-2 mb-6">
        <h3 className="text-lg font-semibold tracking-tight">Service Timeline</h3>
      </div>
      
      <div className="flex flex-col">
        {updates.map((update, index) => {
          const isLast = index === updates.length - 1
          const isFirst = index === 0

          return (
            <div key={update.id} className="flex gap-4 group">
              <div className="flex flex-col items-center">
                <div className="bg-background rounded-full p-0.5 z-10">
                  {isFirst ? 
                    <CheckCircle2 className="w-5 h-5 text-primary" /> : 
                    <Circle className="w-5 h-5 text-muted-foreground/30" />
                  }
                </div>
                {!isLast && <div className="w-px grow bg-border my-1"></div>}
              </div>
              
              <div className="pb-6 pt-0.5">
                <h4 className={`capitalize font-medium text-sm ${isFirst ? 'text-primary' : 'text-foreground'}`}>
                  {update.status?.replace('_', ' ')}
                </h4>
                <p className="text-muted-foreground text-sm mt-1">{update.update_text}</p>
                <p className="text-muted-foreground/60 text-xs mt-2 font-mono">
                  {new Date(update.created_at).toLocaleString()} 
                  <span className="hidden sm:inline"> ({formatDistanceToNow(new Date(update.created_at))} ago)</span>
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
