import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUp, Instagram, Youtube, Send } from 'lucide-react'

import footerLogo from '@/assets/img/manyfacesFooterLogo.svg'
import { useSiteContent } from '@/sanity/SiteContentContext'
import { Button } from '@/components/ui/button'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.19, 1, 0.22, 1],
      staggerChildren: 0.05,
    },
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

export function Footer() {
  const { siteSettings } = useSiteContent()
  const footerSections = siteSettings?.footerSections || []

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="mt-24 border-t border-black/5 bg-neutral-200/50 pt-24">
      <div className="px-7 md:px-20 lg:px-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-16 lg:grid-cols-[1fr_2fr]"
        >
          {/* Newsletter Section */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6" id="newsletter">
            <h3 className="text-4xl font-semibold uppercase tracking-tight">Join the Inner Circle</h3>
            <p className="font-sans text-sm leading-6 opacity-60">
              Get exclusive access to new releases, artist collaborations, and collector-only events.
            </p>
            <form className="relative mt-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email address"
                className="w-full border-b border-black bg-transparent py-3 font-sans text-sm outline-none placeholder:opacity-40 focus:border-black/40"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 transition-transform hover:scale-110"
                aria-label="Subscribe"
              >
                <Send className="size-5" />
              </button>
            </form>
            <div className="mt-4 flex gap-6">
              <a href="https://instagram.com" className="opacity-40 transition-opacity hover:opacity-100" aria-label="Instagram">
                <Instagram className="size-5" />
              </a>
              <a href="https://youtube.com" className="opacity-40 transition-opacity hover:opacity-100" aria-label="YouTube">
                <Youtube className="size-5" />
              </a>
            </div>
          </motion.div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6">
            {footerSections.map((section) => (
              <motion.div key={section.title} variants={itemVariants} className="flex flex-col gap-4">
                <h4 className="font-sans text-[10px] uppercase tracking-[0.3em] opacity-40">{section.title}</h4>
                <ul className="flex flex-col gap-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith('http') || link.href.startsWith('mailto') ? (
                        <a
                          href={link.href}
                          className="font-sans text-[13px] transition-colors hover:text-black hover:opacity-100 opacity-60"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="font-sans text-[13px] transition-colors hover:text-black hover:opacity-100 opacity-60"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-24 flex flex-col items-center justify-between border-t border-black/5 py-12 md:flex-row"
        >
          <p className="font-sans text-[10px] uppercase tracking-widest opacity-40">
            © {new Date().getFullYear()} Tshomo Studios Manyfaces™. All rights reserved.
          </p>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="group mt-8 flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest opacity-40 hover:bg-transparent hover:opacity-100 md:mt-0"
          >
            Back to Top
            <ArrowUp className="size-3 transition-transform group-hover:-translate-y-1" />
          </Button>
        </motion.div>
      </div>

      {/* Large Brand Mark */}
      <motion.img
        src={footerLogo}
        alt=""
        className="h-auto w-full opacity-5"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 0.05, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
      />
    </footer>
  )
}
