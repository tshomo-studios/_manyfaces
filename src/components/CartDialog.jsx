import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, Trash2, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { featuredProduct } from '@/data/products'
import { removeLine, updateLineQuantity } from '@/shopify/client'

const formatMoney = (amount, currencyCode) => {
  const value = Math.round(Number(amount || 0))
  if (currencyCode === 'ZAR') return `R${value}`
  return `${currencyCode || ''} ${value}`.trim()
}

const drawerVariants = {
  hidden: { y: '100%', x: 0 },
  visible: { y: 0, x: 0, transition: { duration: 0.45, ease: [0.19, 1, 0.22, 1] } },
  exit: { y: '100%', transition: { duration: 0.32, ease: [0.19, 1, 0.22, 1] } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.19, 1, 0.22, 1] } },
  exit: { opacity: 0, x: 18, transition: { duration: 0.2 } },
}

export function CartDialog({ cart, open, onOpenChange, onCartChange }) {
  const lines = cart?.lines?.nodes || []
  const subtotal = cart?.cost?.subtotalAmount
  const subtotalText = subtotal ? formatMoney(subtotal.amount, subtotal.currencyCode) : 'R0'

  const updateQuantity = async (lineId, quantity) => {
    try {
      const updatedCart = await updateLineQuantity(lineId, quantity)
      onCartChange(updatedCart)
    } catch (error) {
      console.warn(error.message)
    }
  }

  const removeItem = async (lineId) => {
    try {
      const updatedCart = await removeLine(lineId)
      onCartChange(updatedCart)
    } catch (error) {
      console.warn(error.message)
    }
  }

  const checkout = () => {
    if (cart?.checkoutUrl) window.location.href = cart.checkoutUrl
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        hideCloseButton
        className="inset-x-0 bottom-0 top-auto max-h-[92svh] overflow-hidden rounded-t-lg border-0 bg-black p-0 text-white md:inset-y-0 md:left-auto md:right-0 md:h-screen md:max-h-none md:w-107.5 md:rounded-none"
      >
        <motion.aside
          variants={drawerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex max-h-[92svh] flex-col overflow-y-auto px-7 py-7 md:h-screen md:max-h-none md:px-8 md:py-8"
        >
          <DialogHeader className="flex-row items-start justify-between gap-6 space-y-0 text-left">
            <DialogTitle className="font-mango text-7xl font-semibold leading-none md:text-8xl">
              Checkout
            </DialogTitle>
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-11 text-white hover:bg-white/10"
                aria-label="Close cart"
              >
                <X className="size-7" />
              </Button>
            </DialogClose>
          </DialogHeader>

          <div className="mt-12 grid gap-6">
            <AnimatePresence initial={false}>
              {lines.map((line) => {
                const variant = line.merchandise
                const title = variant?.product?.title || 'Item'
                const image = variant?.image?.url || featuredProduct.image
                const altText = variant?.image?.altText || title
                const price = formatMoney(variant?.price?.amount, variant?.price?.currencyCode)

                return (
                  <motion.div key={line.id} variants={itemVariants} initial="hidden" animate="visible" exit="exit">
                    <Card className="border-white/15 bg-white/[0.03] text-white shadow-none">
                      <CardContent className="grid grid-cols-[minmax(0,1fr)_8.75rem] items-end gap-5 p-0">
                        <img src={image} alt={altText} className="h-40 w-full self-end object-contain object-bottom" />

                        <div className="grid gap-1 pb-3 pr-3">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="text-5xl font-semibold leading-none">{title}</h3>
                              <p className="font-sans text-[10px] leading-4">{featuredProduct.subtitle}</p>
                            </div>

                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="size-8 text-white hover:bg-white/10"
                              aria-label={`Remove ${title}`}
                              onClick={() => removeItem(line.id)}
                            >
                              <Trash2 className="size-5" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between gap-4">
                            <p className="text-2xl font-semibold">{price}</p>
                            <div className="flex h-7 items-center rounded-full border border-white px-2 text-sm font-semibold">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="size-6 text-white hover:bg-white/10"
                                aria-label={`Decrease ${title} quantity`}
                                onClick={() => updateQuantity(line.id, line.quantity - 1)}
                              >
                                <Minus className="size-3" />
                              </Button>
                              <span className="min-w-6 text-center">{line.quantity}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="size-6 text-white hover:bg-white/10"
                                aria-label={`Increase ${title} quantity`}
                                onClick={() => updateQuantity(line.id, line.quantity + 1)}
                              >
                                <Plus className="size-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {lines.length === 0 && <p className="mt-12 font-sans text-sm text-white/70">Your cart is empty.</p>}

          <div className="mt-12 border-t border-dashed border-white/80 pt-20">
            <div className="flex items-start justify-between gap-8">
              <div>
                <p className="text-4xl font-semibold">Subtotal</p>
                <p className="mt-4 font-sans text-sm">Shipping</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-semibold">{subtotalText}</p>
                <p className="mt-4 max-w-40 font-sans text-sm leading-5">
                  Included in price when located South Africa
                </p>
              </div>
            </div>

            <Button
              type="button"
              className="mt-14 h-15 w-full rounded-full bg-white font-mango text-4xl font-semibold text-black hover:bg-white/90"
              disabled={lines.length === 0}
              onClick={checkout}
            >
              {lines.length === 0 ? 'Cart empty' : 'Checkout'}
            </Button>
          </div>
        </motion.aside>
      </DialogContent>
    </Dialog>
  )
}
