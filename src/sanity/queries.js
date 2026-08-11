export const siteContentQuery = `{
  "siteSettings": *[_type == "siteSettings"][0]{
    primaryNav,
    footerSections,
    aboutCopy
  },
  "heroSlides": *[_type == "heroSlide"] | order(order asc) {
    "id": slideId,
    productHandle,
    title,
    subtitle,
    description,
    ctaText,
    ctaLink,
    badge,
    bgGradient,
    "image": image.asset->url,
    "imageAlt": coalesce(image.alt, "")
  },
  "quotes": *[_type == "quote"]{
    "id": _id,
    handle,
    text,
    author
  },
  "products": *[_type == "productContent"] | order(handle.current asc) {
    "handle": handle.current,
    title,
    subtitle,
    teaser,
    details,
    dimensions,
    material,
    quote,
    "image": image.asset->url,
    "imageAlt": coalesce(image.alt, ""),
    "closeupImage": closeupImage.asset->url,
    "closeupAlt": coalesce(closeupImage.alt, "")
  },
  "news": *[_type == "newsItem"] | order(date desc) {
    "id": _id,
    title,
    date,
    excerpt,
    "slug": slug.current
  }
}`
