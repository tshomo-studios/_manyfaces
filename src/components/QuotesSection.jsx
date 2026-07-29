import { motion } from 'framer-motion'
import { quotes } from '@/data/quotes'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] },
  },
}

export function QuotesSection() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="px-7 py-24 md:px-20 lg:px-28"
    >
      <div className="grid gap-12 md:grid-cols-2">
        {quotes.map((quote) => (
          <motion.div key={quote.id} variants={itemVariants} className="flex flex-col gap-4">
            <blockquote className="text-6xl font-semibold leading-none md:text-7xl">
              "{quote.text}"
            </blockquote>
            <cite className="font-sans text-sm not-italic opacity-60">
              — {quote.author}
            </cite>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
