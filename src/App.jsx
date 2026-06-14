import { useEffect, useMemo, useState } from 'react'

import { CartDialog } from '@/components/CartDialog'
import { Footer } from '@/components/Footer'
import { HomeHero } from '@/components/HomeHero'
import { Navbar } from '@/components/Navbar'
import { ProductDetails } from '@/components/ProductDetails'
import { ProductHero } from '@/components/ProductHero'
import { AboutSection } from '@/components/AboutSection'
import { fetchCart } from '@/shopify/client'
import { featuredProduct } from '@/data/products'

const getCurrentPage = () => {
  const pathname = window.location.pathname.toLowerCase()

  if (pathname.includes('grootman')) return 'product'
  if (pathname.includes('about')) return 'about'
  return 'home'
}

export default function App() {
  const [page] = useState(getCurrentPage)
  const [cart, setCart] = useState(null)
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    fetchCart()
      .then(setCart)
      .catch((error) => {
        console.warn(error.message)
        setCart(null)
      })
  }, [])

  const cartCount = cart?.totalQuantity || 0

  const pageTitle = useMemo(() => {
    if (page === 'product') return 'Grootman | manyfaces'
    if (page === 'about') return 'About | manyfaces'
    return 'manyfaces'
  }, [page])

  useEffect(() => {
    document.title = pageTitle
  }, [pageTitle])

  return (
    <div className="min-h-screen font-mango text-black">
      <Navbar cartCount={cartCount} onCartOpen={() => setIsCartOpen(true)} />

      {page === 'home' && <HomeHero product={featuredProduct} />}

      {page === 'product' && (
        <main>
          <ProductHero product={featuredProduct} onCartChange={setCart} onCartOpen={() => setIsCartOpen(true)} />
          <ProductDetails product={featuredProduct} onCartChange={setCart} onCartOpen={() => setIsCartOpen(true)} />
        </main>
      )}

      {page === 'about' && <AboutSection />}

      <Footer />

      <CartDialog
        cart={cart}
        open={isCartOpen}
        onOpenChange={setIsCartOpen}
        onCartChange={setCart}
      />
    </div>
  )
}
