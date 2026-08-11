import navLink from './navLink'

export default {
  name: 'footerSection',
  title: 'Footer Section',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    {
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{ type: navLink.name }],
    },
  ],
}
