import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProductHeroSlide } from './ProductHeroSlide'
import { useSiteContent } from '@/sanity/SiteContentContext'
import { cn } from '@/lib/utils'

/**
 * Main HomeHero Carousel Component
 */
export function HomeHeroCarousel() {
  const { heroSlides } = useSiteContent()
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const paginate = useCallback((newDirection) => {
    setDirection(newDirection)
    setIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection
      if (nextIndex < 0) nextIndex = heroSlides.length - 1
      if (nextIndex >= heroSlides.length) nextIndex = 0
      return nextIndex
    })
  }, [heroSlides.length])

  // Auto-rotation: 7 seconds
  useEffect(() => {
    if (isHovered) return
    
    const interval = setInterval(() => {
      paginate(1)
    }, 7000)

    return () => clearInterval(interval)
  }, [paginate, isHovered])

  if (heroSlides.length === 0) {
    return null
  }

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity
  }

  return (
    <section 
      className="relative h-screen w-full overflow-hidden pt-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
            opacity: { duration: 0.4 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x)

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1)
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1)
            }
          }}
          className="absolute inset-0"
        >
          {/* Background Gradient Layer */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t opacity-40 transition-colors duration-1000",
            heroSlides[index].bgGradient
          )} />
          
          <ProductHeroSlide slide={heroSlides[index]} isActive={true} />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute inset-x-0 bottom-12 z-20 flex items-center justify-between px-7 md:px-20 lg:px-28">
        {/* Pagination Indicators */}
        <div className="flex gap-3">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1)
                setIndex(i)
              }}
              className={cn(
                "h-1 transition-all duration-500",
                i === index ? "w-12 bg-black" : "w-6 bg-black/20"
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Directional Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => paginate(-1)}
            className="group flex size-12 items-center justify-center rounded-full border border-black/10 bg-white/50 backdrop-blur-sm transition-all hover:bg-black hover:text-white"
            aria-label="Previous slide"
          >
            <ChevronLeft className="size-6 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="group flex size-12 items-center justify-center rounded-full border border-black/10 bg-white/50 backdrop-blur-sm transition-all hover:bg-black hover:text-white"
            aria-label="Next slide"
          >
            <ChevronRight className="size-6 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>
  )
}
