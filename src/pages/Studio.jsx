import { lazy, Suspense } from 'react'

const SanityStudio = lazy(() => import('@/sanity/Studio'))

export default function StudioPage() {
  return (
    <div className="h-screen max-h-dvh overflow-auto overscroll-none">
      <Suspense fallback={null}>
        <SanityStudio />
      </Suspense>
    </div>
  )
}
