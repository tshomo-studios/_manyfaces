export default {
  name: 'newsItem',
  title: 'News Item',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'date', title: 'Date', type: 'date' },
    { name: 'excerpt', title: 'Excerpt', type: 'text' },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    },
  ],
}
