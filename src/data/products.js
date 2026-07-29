import grootmanImage from '@/assets/img/grootman.png'
import grootmanCloseup from '@/assets/img/IMG_4227.PNG'

export const products = [
  {
    handle: 'grootman',
    title: 'Grootman',
    price: 'R 899',
    formattedPrice: 'R899',
    subtitle: 'Art toy (25cm x 18cm x 18cm)',
    teaser: 'A narrative of Grootman, a taxi driver in Johannesburg, exploring themes of struggle, dreams, and familial responsibility.',
    details:
      "Right here, we have Grootman, a representation of our fathers, uncles and grand timers. We see him sitting on the front porch/patio from that well-respected house around the block, or sitting in front of the fleet of taxi's.",
    dimensions: '250mm x 180mm x 180mm',
    material: 'Collectible mixed-media figure',
    quote: 'Some people wear uniforms. Others wear dreams.',
    image: grootmanImage,
    closeupImage: grootmanCloseup,
    imageAlt: 'Grootman collectible figure',
    closeupAlt: 'Close-up of Grootman collectible figure',
  },
]

export const featuredProduct = products[0]

export const getProductByHandle = (handle) => products.find((product) => product.handle === handle)
