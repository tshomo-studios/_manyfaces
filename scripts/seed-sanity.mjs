#!/usr/bin/env node
/**
 * One-time seed script for Sanity content.
 *
 * Usage:
 *   VITE_SANITY_PROJECT_ID=xxx VITE_SANITY_DATASET=production SANITY_API_TOKEN=xxx node scripts/seed-sanity.mjs
 */
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')

const projectId = process.env.VITE_SANITY_PROJECT_ID
const dataset = process.env.VITE_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId || !token) {
  console.error('Missing VITE_SANITY_PROJECT_ID or SANITY_API_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.VITE_SANITY_API_VERSION || '2025-02-01',
  token,
  useCdn: false,
})

async function uploadImage(relativePath, alt) {
  const buffer = readFileSync(join(rootDir, relativePath))
  const asset = await client.assets.upload('image', buffer, {
    filename: relativePath.split('/').pop(),
  })

  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
    alt,
  }
}

const primaryNavItems = [
  { label: 'home', href: '/' },
  { label: 'grootman', href: '/product/grootman' },
  { label: 'about', href: '/about' },
]

const footerSections = [
  {
    title: 'Shop',
    links: [
      { label: 'New Releases', href: '/' },
      { label: 'Featured Collectibles', href: '/product/grootman' },
      { label: 'Limited Editions', href: '/product/grootman' },
      { label: 'Best Sellers', href: '/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Story', href: '/about' },
      { label: 'Careers', href: '#careers' },
      { label: 'Contact', href: 'mailto:hello@manyfaces.co.za' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQs', href: '#faqs' },
      { label: 'Shipping Policy', href: '#shipping' },
      { label: 'Returns', href: '#returns' },
      { label: 'Track Order', href: '#track' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
      { label: 'Cookie Policy', href: '#cookies' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Instagram', href: 'https://instagram.com/manyfaces' },
      { label: 'YouTube', href: 'https://youtube.com/manyfaces' },
      { label: 'TikTok', href: 'https://tiktok.com/@manyfaces' },
      { label: 'Newsletter', href: '#newsletter' },
    ],
  },
  {
    title: 'Creators',
    links: [
      { label: 'Artist Collaborations', href: '#collabs' },
      { label: 'Submit Artwork', href: '#submit' },
      { label: 'Licensing', href: '#licensing' },
      { label: 'Partnerships', href: '#partners' },
    ],
  },
]

const aboutCopy = [
  'manyfaces is a collectible art project from Tshomo Studios, based in Johannesburg, South Africa. We make small sculptures of the people we grew up around - the uncles, the grootmans, the corner regulars - and give each one a story you can hold.',
  "Every figure in the series belongs to a wider narrative. Grootman is the first. More faces are on the way: each shaped by the same eye for the ordinary, the lived-in, the quietly important. If our collectibles feel familiar, that's the point.",
  'The studio is independent and small. We produce in limited runs, ship from Johannesburg, and answer our own emails. If something about a piece speaks to you, come say hello.',
]

async function seed() {
  console.log('Uploading images...')
  const grootmanImage = await uploadImage('src/assets/img/grootman.png', 'Grootman collectible figure')
  const grootmanCloseup = await uploadImage('src/assets/img/IMG_4227.PNG', 'Close-up of Grootman collectible figure')

  console.log('Seeding documents...')
  const transaction = client.transaction()

  transaction.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    primaryNav: primaryNavItems,
    footerSections,
    aboutCopy,
  })

  transaction.createOrReplace({
    _id: 'heroSlide-grootman',
    _type: 'heroSlide',
    slideId: 'grootman-hero',
    order: 0,
    productHandle: 'grootman',
    title: 'Grootman',
    subtitle: 'Limited Edition Collectible',
    description:
      'A narrative of struggle, dreams, and familial responsibility. Grootman represents the figures we grew up around.',
    ctaText: 'Get to know',
    ctaLink: '/product/grootman',
    badge: 'New Release',
    bgGradient: 'from-neutral-300 to-neutral-500',
    image: grootmanImage,
  })

  transaction.createOrReplace({
    _id: 'heroSlide-coming-soon',
    _type: 'heroSlide',
    slideId: 'coming-soon-hero',
    order: 1,
    productHandle: 'coming-soon',
    title: 'The Regular',
    subtitle: 'Series 01: Corner Legends',
    description:
      'Every corner has a regular. Every regular has a story. The next face in our series is arriving soon.',
    ctaText: 'Notify Me',
    ctaLink: '#newsletter',
    badge: 'Coming Soon',
    bgGradient: 'from-neutral-400 to-neutral-600',
    image: grootmanImage,
  })

  transaction.createOrReplace({
    _id: 'quote-grootman',
    _type: 'quote',
    handle: 'grootman',
    text: 'Some people wear uniforms. Others wear dreams.',
    author: 'Grootman',
  })

  transaction.createOrReplace({
    _id: 'productContent-grootman',
    _type: 'productContent',
    handle: { _type: 'slug', current: 'grootman' },
    title: 'Grootman',
    subtitle: 'Art toy (25cm x 18cm x 18cm)',
    teaser:
      'A narrative of Grootman, a taxi driver in Johannesburg, exploring themes of struggle, dreams, and familial responsibility.',
    details:
      "Right here, we have Grootman, a representation of our fathers, uncles and grand timers. We see him sitting on the front porch/patio from that well-respected house around the block, or sitting in front of the fleet of taxi's.",
    dimensions: '250mm x 180mm x 180mm',
    material: 'Collectible mixed-media figure',
    quote: 'Some people wear uniforms. Others wear dreams.',
    image: grootmanImage,
    closeupImage: grootmanCloseup,
  })

  transaction.createOrReplace({
    _id: 'newsItem-grootman-launch',
    _type: 'newsItem',
    title: 'Grootman Figure Launch',
    date: '2024-03-20',
    excerpt: 'The first figure in our series is now available for pre-order.',
    slug: { _type: 'slug', current: 'grootman-figure-launch' },
  })

  await transaction.commit()
  console.log('Seed complete.')
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
