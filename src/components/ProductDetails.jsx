import { motion, useInView } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { addToCart, fetchProductByHandle } from '@/shopify/client'

const detailVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.19, 1, 0.22, 1], staggerChildren: 0.08 },
  },
}

const detailItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] } },
}

export function ProductDetails({ product, onCartChange, onCartOpen }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-120px' })
  const [status, setStatus] = useState('ready')

  const handleAdd = async () => {
    setStatus('adding')

    try {
      const remoteProduct = await fetchProductByHandle(product.handle)
      const variant =
        remoteProduct?.variants?.nodes?.find((item) => item.availableForSale) ||
        remoteProduct?.variants?.nodes?.[0]

      if (!variant?.availableForSale) {
        setStatus('unavailable')
        return
      }

      const cart = await addToCart(variant.id, 1)
      onCartChange(cart)
      onCartOpen()
      setStatus('added')
      window.setTimeout(() => setStatus('ready'), 1200)
    } catch (error) {
      console.warn(error.message)
      setStatus('unavailable')
    }
  }

  return (
    <motion.section
      ref={ref}
      variants={detailVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="pt-8 md:px-20 md:pt-16 lg:px-28"
    >
      <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-20">
        <motion.div variants={detailItem} className="overflow-hidden">
          <motion.img
            src={product.closeupImage}
            alt={product.closeupAlt}
            className="w-full object-cover md:max-w-190 [-webkit-mask-image:linear-gradient(to_bottom,black_40%,transparent_92%)] [mask-image:linear-gradient(to_bottom,black_40%,transparent_92%)]"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          />
        </motion.div>

        <motion.div variants={detailVariants} className="grid gap-5 px-7 md:px-0 md:pt-14">
          {[
            ['Details', product.details],
            ['Dimensions', product.dimensions],
            ['Material', product.material],
          ].map(([title, content]) => (
            <motion.div key={title} variants={detailItem}>
              <Card className="border-black/20 bg-white/20 shadow-none backdrop-blur-sm">
                <CardContent className="p-5">
                  <h2 className="text-4xl font-semibold">{title}</h2>
                  <p className="max-w-md font-sans text-sm leading-5">{content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          <motion.div variants={detailItem} className="flex items-center gap-6 pt-2 md:pt-12">
            <p className="text-6xl font-semibold">{product.formattedPrice}</p>
            <Button
              type="button"
              className="h-14 rounded-full bg-black px-10 font-mango text-2xl font-semibold text-white hover:bg-black/80"
              disabled={status === 'adding' || status === 'added' || status === 'unavailable'}
              onClick={handleAdd}
            >
              <ShoppingBag className="size-5" />
              {status === 'adding'
                ? 'adding...'
                : status === 'added'
                  ? 'added'
                  : status === 'unavailable'
                    ? 'unavailable'
                    : 'add to cart'}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
