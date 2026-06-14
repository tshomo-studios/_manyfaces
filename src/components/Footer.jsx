import { motion } from 'framer-motion'

import footerLogo from '@/assets/img/manyfacesFooterLogo.svg'
import { footerLinks } from '@/data/navigation'

const footerVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.19, 1, 0.22, 1],
      staggerChildren: 0.06,
    },
  },
}

export function Footer() {
  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="flex flex-col pt-16 md:pt-24"
    >
      <nav className="px-10 md:px-20" aria-label="Footer">
        <ul className="text-5xl font-semibold md:text-5xl">
          {footerLinks.map((link) => (
            <motion.li
              key={link.href}
              variants={footerVariants}
              whileHover={{ x: 10, color: 'rgb(245 245 245)' }}
              transition={{ duration: 0.2 }}
            >
              <a href={link.href}>{link.label}</a>
            </motion.li>
          ))}
        </ul>
      </nav>
      <motion.img
        src={footerLogo}
        alt=""
        className="h-auto w-full"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
      />
    </motion.footer>
  )
}
