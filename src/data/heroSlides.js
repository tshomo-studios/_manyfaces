import { products } from './products'

/**
 * Data for the HomeHeroCarousel slides.
 * Each slide references a product and provides custom messaging.
 */
export const heroSlides = [
  {
    id: 'grootman-hero',
    productHandle: 'grootman',
    title: products[0].title,
    subtitle: 'Limited Edition Collectible',
    description: 'A narrative of struggle, dreams, and familial responsibility. Grootman represents the figures we grew up around.',
    ctaText: 'Get to know',
    ctaLink: '/product/grootman',
    badge: 'New Release',
    image: products[0].image,
    imageAlt: products[0].imageAlt,
    bgGradient: 'from-neutral-300 to-neutral-500'
  },
  {
    id: 'coming-soon-hero',
    productHandle: 'coming-soon',
    title: 'The Regular',
    subtitle: 'Series 01: Corner Legends',
    description: 'Every corner has a regular. Every regular has a story. The next face in our series is arriving soon.',
    ctaText: 'Notify Me',
    ctaLink: '#newsletter',
    badge: 'Coming Soon',
    image: products[0].image, // Placeholder using existing asset for visual consistency
    imageAlt: 'Coming Soon Figure',
    bgGradient: 'from-neutral-400 to-neutral-600'
  }
]
