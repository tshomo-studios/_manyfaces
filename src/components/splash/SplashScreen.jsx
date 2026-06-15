import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import manyfacesLogo from '@/assets/img/manyfacesLogo.svg'

/**
 * Premium Splash Screen Component
 * Features cinematic entrance/exit transitions and brand messaging.
 */
export function SplashScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Premium duration: 3.2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3200)

    return () => clearTimeout(timer)
  }, [])

  const containerVariants = {
    exit: {
      y: '-100%',
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        when: 'afterChildren'
      }
    }
  }

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.19, 1, 0.22, 1],
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
    }
  }

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          key="splash"
          variants={containerVariants}
          initial="initial"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white"
        >
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center gap-6"
          >
            {/* Logo Animation */}
            <motion.img 
              variants={itemVariants}
              src={manyfacesLogo} 
              alt="manyfaces Logo" 
              className="w-48 invert md:w-64"
            />
            
            {/* Tagline Animation */}
            <motion.div variants={itemVariants} className="text-center">
              <p className="font-sans text-xs uppercase tracking-[0.4em] opacity-60">
                Premium Collectible Art
              </p>
            </motion.div>
          </motion.div>

          {/* Skip interaction */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            whileHover={{ opacity: 0.8 }}
            onClick={() => setIsVisible(false)}
            className="absolute bottom-12 font-sans text-[10px] uppercase tracking-widest outline-none"
          >
            Skip Intro
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
