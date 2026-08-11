import { useEffect, useState } from 'react'
import { Routes, Route, useLocation, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

import { SplashScreen } from '@/components/splash/SplashScreen'
import { CartDialog } from '@/components/CartDialog'
import { Footer } from '@/components/Footer'
import { HomeHeroCarousel } from '@/components/home/HomeHeroCarousel'
import { QuotesSection } from '@/components/QuotesSection'
import { Navbar } from '@/components/Navbar'
import { ProductDetails } from '@/components/ProductDetails'
import { ProductHero } from '@/components/ProductHero'
import { AboutSection } from '@/components/AboutSection'
import StudioPage from '@/pages/Studio'
import { SiteContentProvider, useSiteContent } from '@/sanity/SiteContentContext'
import { fetchCart } from '@/shopify/client'

function ProductPage({ onCartChange, onCartOpen }) {
  const { handle } = useParams()
  const { getProductByHandle, loading } = useSiteContent()
  const product = getProductByHandle(handle)

  if (loading) {
    return null
  }

  if (!product) {
    return <div className="pt-40 text-center text-4xl">Product not found</div>
  }

  return (
    <main>
      <ProductHero product={product} onCartChange={onCartChange} onCartOpen={onCartOpen} />
      <ProductDetails product={product} onCartChange={onCartChange} onCartOpen={onCartOpen} />
    </main>
  )
}

function MainApp() {
  const [showSplash, setShowSplash] = useState(true)
  const [cart, setCart] = useState(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { pathname } = useLocation()
  const { loading, error } = useSiteContent()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    fetchCart()
      .then(setCart)
      .catch((fetchError) => {
        console.warn(fetchError.message)
        setCart(null)
      })
  }, [])

  const cartCount = cart?.totalQuantity || 0

  if (loading) {
    return null
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 font-sans text-sm">
        Unable to load site content. Check Sanity env vars and CORS settings.
      </div>
    )
  }

  return (
    <div className="min-h-screen font-mango text-black">
      <SplashScreen onComplete={() => setShowSplash(false)} />

      {!showSplash && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <Navbar cartCount={cartCount} onCartOpen={() => setIsCartOpen(true)} />

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HomeHeroCarousel />
                  <QuotesSection />
                </>
              }
            />
            <Route path="/about" element={<AboutSection />} />
            <Route
              path="/product/:handle"
              element={<ProductPage onCartChange={setCart} onCartOpen={() => setIsCartOpen(true)} />}
            />
          </Routes>

          <Footer />
        </motion.div>
      )}

      <CartDialog
        cart={cart}
        open={isCartOpen}
        onOpenChange={setIsCartOpen}
        onCartChange={setCart}
      />
    </div>
  )
}

export default function App() {
  const { pathname } = useLocation()
  const isStudio = pathname.startsWith('/studio')

  if (isStudio) {
    return (
      <Routes>
        <Route path="/studio/*" element={<StudioPage />} />
      </Routes>
    )
  }

  return (
    <SiteContentProvider>
      <MainApp />
    </SiteContentProvider>
  )
}
