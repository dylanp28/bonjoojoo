'use client'

import { useRef, useEffect, useState } from 'react'

interface LazyVideoProps {
  src: string
  className?: string
  /** If true, starts loading and playing immediately (use for above-the-fold hero) */
  eager?: boolean
}

/**
 * Video that only loads its source when the element is near the viewport.
 * Prevents unnecessary network requests for off-screen background videos.
 */
export function LazyVideo({ src, className, eager = false }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [shouldLoad, setShouldLoad] = useState(eager)

  useEffect(() => {
    if (eager) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [eager])

  return (
    <video
      ref={ref}
      autoPlay={shouldLoad}
      muted
      loop
      playsInline
      className={className}
    >
      {shouldLoad && <source src={src} type="video/mp4" />}
    </video>
  )
}
