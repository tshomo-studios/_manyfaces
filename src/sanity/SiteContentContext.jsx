import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { client } from './client'
import { isSanityConfigured } from './env'
import { siteContentQuery } from './queries'

const SiteContentContext = createContext(null)

export function SiteContentProvider({ children }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isSanityConfigured() || !client) {
      setLoading(false)
      setError(new Error('Sanity env vars missing: set VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET'))
      return
    }

    let ignore = false

    client
      .fetch(siteContentQuery)
      .then((result) => {
        if (!ignore) setData(result)
      })
      .catch((fetchError) => {
        if (!ignore) setError(fetchError)
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [])

  const value = useMemo(() => {
    const products = data?.products || []

    return {
      data,
      loading,
      error,
      siteSettings: data?.siteSettings,
      heroSlides: data?.heroSlides || [],
      quotes: data?.quotes || [],
      news: data?.news || [],
      products,
      featuredProduct: products[0] || null,
      getProductByHandle: (handle) => products.find((product) => product.handle === handle),
    }
  }, [data, loading, error])

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  )
}

export function useSiteContent() {
  const context = useContext(SiteContentContext)
  if (!context) {
    throw new Error('useSiteContent must be used within SiteContentProvider')
  }
  return context
}
