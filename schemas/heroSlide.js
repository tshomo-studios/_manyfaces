export default {
  name: 'heroSlide',
  title: 'Hero Slide',
  type: 'document',
  fields: [
    { name: 'slideId', title: 'Slide ID', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'order', title: 'Order', type: 'number' },
    { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'subtitle', title: 'Subtitle', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'ctaText', title: 'CTA Text', type: 'string' },
    { name: 'ctaLink', title: 'CTA Link', type: 'string' },
    { name: 'badge', title: 'Badge', type: 'string' },
    { name: 'productHandle', title: 'Product Handle', type: 'string' },
    { name: 'bgGradient', title: 'Background Gradient', type: 'string' },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
    },
  ],
  orderings: [
    { title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
}
