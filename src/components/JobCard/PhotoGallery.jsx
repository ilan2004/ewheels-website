import React, { useState } from 'react'
import { ImageIcon, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function PhotoGallery({ photos }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  if (!photos || photos.length === 0) return null

  const openLightbox = (index) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const prev = () => setLightboxIndex((i) => (i - 1 + photos.length) % photos.length)
  const next = () => setLightboxIndex((i) => (i + 1) % photos.length)

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
  }

  return (
    <>
      <Card className="shadow-sm border-border/70">
        <CardContent className="pt-5">
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon className="w-4 h-4 text-primary" />
            <h3 className="text-base font-semibold">Service Photos</h3>
            <span className="ml-auto text-xs text-muted-foreground">{photos.length} photo{photos.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => openLightbox(index)}
                className="group relative aspect-square rounded-lg overflow-hidden bg-muted border border-border hover:border-primary/50 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <img
                  src={photo.url}
                  alt={photo.original_name || photo.file_name || `Photo ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div className="hidden w-full h-full flex-col items-center justify-center gap-1 text-muted-foreground">
                  <ImageIcon className="w-6 h-6" />
                  <span className="text-xs">No preview</span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                  <ZoomIn className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            onClick={closeLightbox}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-mono">
            {lightboxIndex + 1} / {photos.length}
          </div>

          {/* Prev */}
          {photos.length > 1 && (
            <button
              className="absolute left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); prev() }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Image */}
          <img
            src={photos[lightboxIndex].url}
            alt={photos[lightboxIndex].original_name || `Photo ${lightboxIndex + 1}`}
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          {photos.length > 1 && (
            <button
              className="absolute right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); next() }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Name */}
          {photos[lightboxIndex].original_name && (
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-xs truncate max-w-xs text-center">
              {photos[lightboxIndex].original_name}
            </p>
          )}
        </div>
      )}
    </>
  )
}
