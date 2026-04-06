import React from "react"
import { Progress } from "@/components/ui/progress"
import { Check } from "lucide-react"

const STATUS_STEPS = [
  { id: 'reported', label: 'Reported' },
  { id: 'triaged', label: 'Triaged' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'completed', label: 'Completed' },
  { id: 'delivered', label: 'Delivered' }
]

export default function StepperProgress({ currentStatus }) {
  const currentStatusLower = currentStatus?.toLowerCase() || 'reported'
  
  // Find current index
  let currentIndex = STATUS_STEPS.findIndex(step => step.id === currentStatusLower)
  
  // Handle edge cases
  if (currentStatusLower === 'cancelled' || currentStatusLower === 'closed') {
    currentIndex = STATUS_STEPS.length - 1
  }
  if (currentIndex === -1) currentIndex = 0

  // Calculate percentage for progress bar (between centers of steps)
  const progressPercentage = (currentIndex / (STATUS_STEPS.length - 1)) * 100

  return (
    <div className="w-full py-6">
      <div className="relative">
        {/* Background Bar */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 px-4 z-0">
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Steps */}
        <div className="relative z-10 flex justify-between">
          {STATUS_STEPS.map((step, index) => {
            const isCompleted = index <= currentIndex
            const isCurrent = index === currentIndex
            
            return (
              <div key={step.id} className="flex flex-col items-center gap-2">
                <div 
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background transition-colors
                    ${isCompleted ? 'border-primary text-primary' : 'border-muted text-muted-foreground'}
                    ${isCurrent ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
                  `}
                >
                  {isCompleted && !isCurrent ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span className="text-xs font-semibold">{index + 1}</span>
                  )}
                </div>
                <span className={`text-xs font-medium sm:text-sm absolute mt-10
                  ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}
                `}>
                  {step.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="h-8" /> {/* Spacing for absolute text */}
    </div>
  )
}
