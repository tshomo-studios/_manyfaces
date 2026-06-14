export const quotes = [
  {
    id: 'grootman-quote',
    handle: 'grootman',
    text: 'Some people wear uniforms. Others wear dreams.',
    author: 'Grootman',
  },
]

export const getRandomQuote = () => quotes[Math.floor(Math.random() * quotes.length)]
export const getQuoteByHandle = (handle) => quotes.find((q) => q.handle === handle)
