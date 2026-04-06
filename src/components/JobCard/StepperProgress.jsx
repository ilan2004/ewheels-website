import React from "react"
import { Check } from "lucide-react"

const STATUS_STEPS = [
  { id: 'reported', label: 'Received' },
  { id: 'triaged', label: 'Triaged' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'completed', label: 'Completed' },
  { id: 'delivered', label: 'Delivered' }
]

export default function StepperProgress({ currentStatus }) {
  const currentStatusLower = currentStatus?.toLowerCase() || 'reported'

  let currentIndex = STATUS_STEPS.findIndex(step => step.id === currentStatusLower)
  if (currentStatusLower === 'cancelled' || currentStatusLower === 'closed') {
    currentIndex = STATUS_STEPS.length - 1
  }
  if (currentIndex === -1) currentIndex = 0

  return (
    <div className="w-full pt-2 pb-6">
      <div className="relative flex items-center justify-between">
        {/* Background connector track */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-border z-0" />
        {/* Filled connector */}
        <div
          className="absolute top-4 left-0 h-0.5 bg-primary z-0 transition-all duration-700"
          style={{ width: `${(currentIndex / (STATUS_STEPS.length - 1)) * 100}%` }}
        />

        {STATUS_STEPS.map((step, index) => {
          const isCompleted = index < currentIndex
          const isCurrent = index === currentIndex
          const isPending = index > currentIndex

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300
                  ${isCompleted ? 'bg-primary border-primary text-primary-foreground' : ''}
                  ${isCurrent ? 'bg-white border-primary shadow-md shadow-primary/20' : ''}
                  ${isPending ? 'bg-white border-border text-muted-foreground' : ''}
                `}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className={`text-xs font-bold ${isCurrent ? 'text-primary' : 'text-muted-foreground'}`}>
                    {index + 1}
                  </span>
                )}
              </div>
              <span
                className={`text-xs font-medium mt-1 whitespace-nowrap
                  ${isCompleted || isCurrent ? 'text-primary font-semibold' : 'text-muted-foreground'}
                `}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
