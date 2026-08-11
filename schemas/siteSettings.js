import footerSection from './footerSection'
import navLink from './navLink'

export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'primaryNav',
      title: 'Primary Navigation',
      type: 'array',
      of: [{ type: navLink.name }],
    },
    {
      name: 'footerSections',
      title: 'Footer Sections',
      type: 'array',
      of: [{ type: footerSection.name }],
    },
    {
      name: 'aboutCopy',
      title: 'About Copy',
      type: 'array',
      of: [{ type: 'text' }],
    },
  ],
}
