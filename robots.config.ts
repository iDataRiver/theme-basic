export default [
  { UserAgent: '*' },
  { Allow: '/' },
  { Disallow: '*/order' },
  { BlankLine: true },

  // Be aware that this will NOT work on target: 'static' mode
  { Sitemap: (req: any) => `https://${req.headers.host}/sitemap.xml` }
]