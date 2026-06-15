import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } 
  },
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9, rotate: -2 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    rotate: 0,
    transition: { duration: 1.2, ease: [0.19, 1, 0.22, 1] } 
  },
}

/**
 * Individual ProductHero Slide
 */
export function ProductHeroSlide({ slide, isActive }) {
  return (
    <motion.div
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      className="relative flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center gap-12 px-7 py-12 md:flex-row md:px-20 lg:px-28"
    >
      {/* Content Area */}
      <motion.div variants={contentVariants} className="flex flex-1 flex-col items-center gap-6 text-center md:items-start md:text-left">
        <motion.div variants={itemVariants}>
          <Badge className="border-black bg-transparent font-sans text-[10px] uppercase tracking-[0.3em] text-black">
            {slide.badge}
          </Badge>
        </motion.div>
        
        <motion.div variants={itemVariants} className="space-y-2">
          <p className="font-sans text-xs uppercase tracking-[0.2em] opacity-60">
            {slide.subtitle}
          </p>
          <h1 className="text-8xl font-semibold leading-none sm:text-[10rem] lg:text-[13rem] xl:text-[15rem]">
            {slide.title}
          </h1>
        </motion.div>

        <motion.p variants={itemVariants} className="max-w-md font-sans text-sm leading-6 opacity-80 md:text-base">
          {slide.description}
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 pt-4 md:justify-start">
          <Button
            asChild
            size="lg"
            className="h-auto rounded-full bg-black px-10 py-3 font-mango text-3xl font-semibold text-white hover:bg-black/90"
          >
            <Link to={slide.ctaLink}>{slide.ctaText}</Link>
          </Button>
          
          <Button
            variant="ghost"
            className="font-sans text-[11px] uppercase tracking-widest hover:bg-transparent hover:underline"
          >
            Explore Collection
          </Button>
        </motion.div>
      </motion.div>

      {/* Visual Area */}
      <motion.div 
        variants={imageVariants} 
        className="relative flex flex-1 justify-center md:justify-end"
      >
        <div className="relative aspect-square w-full max-w-144 overflow-hidden [-webkit-mask-image:linear-gradient(to_bottom,black_20%,transparent_90%)] [mask-image:linear-gradient(to_bottom,black_20%,transparent_90%)]">
          <motion.img
            src={slide.image}
            alt={slide.imageAlt}
            className="h-full w-full object-contain object-bottom"
            animate={{ 
              y: [0, -15, 0],
              rotate: [-1, 1, -1]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: 'easeInOut' 
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
