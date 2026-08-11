export default {
  name: 'quote',
  title: 'Quote',
  type: 'document',
  fields: [
    { name: 'handle', title: 'Handle', type: 'string' },
    { name: 'text', title: 'Text', type: 'text', validation: (Rule) => Rule.required() },
    { name: 'author', title: 'Author', type: 'string' },
  ],
}
