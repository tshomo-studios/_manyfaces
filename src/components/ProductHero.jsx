import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'

import { QuantitySelector } from '@/components/QuantitySelector'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { addToCart, fetchProductByHandle } from '@/shopify/client'

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1], staggerChildren: 0.1 },
  },
}

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } },
}

const formatMoney = (amount, currencyCode) => {
  const value = Math.round(Number(amount))
  if (currencyCode === 'ZAR') return `R${value}`
  return `${currencyCode || ''} ${value}`.trim()
}

export function ProductHero({ product, onCartChange, onCartOpen }) {
  const [quantity, setQuantity] = useState(1)
  const [shopifyProduct, setShopifyProduct] = useState(null)
  const [variant, setVariant] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetchProductByHandle(product.handle)
      .then((remoteProduct) => {
        if (ignore) return

        if (!remoteProduct) {
          setStatus('unavailable')
          return
        }

        const selectedVariant =
          remoteProduct.variants?.nodes?.find((item) => item.availableForSale) ||
          remoteProduct.variants?.nodes?.[0] ||
          null

        setShopifyProduct(remoteProduct)
        setVariant(selectedVariant)
        setStatus(selectedVariant?.availableForSale ? 'ready' : 'out-of-stock')
      })
      .catch((error) => {
        console.warn(error.message)
        if (!ignore) setStatus('unavailable')
      })

    return () => {
      ignore = true
    }
  }, [product.handle])

  const displayTitle = shopifyProduct?.title || product.title
  const displayPrice = variant?.price ? formatMoney(variant.price.amount, variant.price.currencyCode) : product.formattedPrice

  const buttonLabel = useMemo(() => {
    if (status === 'loading') return 'loading...'
    if (status === 'adding') return 'adding...'
    if (status === 'added') return 'added'
    if (status === 'out-of-stock') return 'out of stock'
    if (status === 'unavailable') return 'unavailable'
    return 'add to cart'
  }, [status])

  const canAdd = status === 'ready' && variant?.id

  const handleAddToCart = async () => {
    if (!canAdd) return

    setStatus('adding')

    try {
      const cart = await addToCart(variant.id, quantity)
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
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className="px-7 pt-24 md:px-20 lg:px-28"
    >
      <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-20">
        <motion.div variants={childVariants} className="flex justify-center md:sticky md:top-20">
          <motion.img
            src={product.image}
            alt={product.imageAlt}
            className="w-full max-w-155 object-contain"
            animate={{ y: [0, -16, 0], rotate: [-1, 1, -1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        <motion.div variants={childVariants} className="flex flex-col gap-6 pt-0 md:pt-44">
          <div>
            <Badge className="mb-4 border-black bg-transparent font-sans text-[11px] uppercase tracking-[0.24em] text-black">
              limited figure
            </Badge>
            <motion.h1
              variants={childVariants}
              className="text-8xl font-semibold leading-none sm:text-[10rem] lg:text-[12rem]"
            >
              {displayTitle}
            </motion.h1>
            <p className="text-4xl font-semibold">{displayPrice}</p>
          </div>

          <motion.p variants={childVariants} className="max-w-md font-sans text-sm leading-5">
            {product.teaser}
          </motion.p>

          <motion.div variants={childVariants} className="flex items-center gap-3">
            <QuantitySelector value={quantity} onChange={setQuantity} />
            <Button
              type="button"
              className="h-10 flex-1 rounded-full bg-black px-8 font-mango text-xl font-semibold text-white hover:bg-black/80 md:flex-none md:px-20"
              disabled={!canAdd || status === 'adding' || status === 'added'}
              onClick={handleAddToCart}
            >
              <ShoppingBag className="size-4" />
              {buttonLabel}
            </Button>
          </motion.div>

          <motion.blockquote
            variants={childVariants}
            className="hidden max-w-md pt-8 text-6xl font-semibold leading-none md:block"
          >
            "{product.quote}"
          </motion.blockquote>
        </motion.div>
      </div>
    </motion.section>
  )
}
