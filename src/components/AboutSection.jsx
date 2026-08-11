import { motion } from 'framer-motion'

import { useSiteContent } from '@/sanity/SiteContentContext'

const variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.19, 1, 0.22, 1], staggerChildren: 0.09 },
  },
}

export function AboutSection() {
  const { siteSettings } = useSiteContent()
  const aboutCopy = siteSettings?.aboutCopy || []

  return (
    <main className="px-7 pb-16 pt-32 md:px-20 md:pt-44 lg:px-28">
      <motion.section variants={variants} initial="hidden" animate="visible">
        <motion.h1 variants={variants} className="text-8xl font-semibold leading-none sm:text-[10rem] lg:text-[12rem]">
          About
        </motion.h1>

        <motion.div variants={variants} className="grid max-w-2xl gap-6 pt-10 font-sans text-sm leading-6">
          {aboutCopy.map((paragraph) => (
            <motion.p key={paragraph} variants={variants}>
              {paragraph}
            </motion.p>
          ))}
        </motion.div>
      </motion.section>
    </main>
  )
}
