import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { z } from 'zod'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'

const productionEnvironmentSchema = z.object({
  VITE_API_URL: z.url(),
  VITE_SITE_URL: z.url(),
  VITE_IS_DEMO_STORE: z.enum(['true', 'false']),
  VITE_LEGAL_OPERATOR_NAME: z.string().trim().min(1),
  VITE_LEGAL_POSTAL_ADDRESS: z.string().trim().min(1),
  VITE_LEGAL_EMAIL: z.email(),
  VITE_SUPPORT_EMAIL: z.email(),
})

type SeoProduct = {
  slug: string
  name: string
  subtitle?: string
  description: string
  images: Array<{ url: string; isPrimary: boolean }>
  variants: Array<{ price: number; sku: string; stock: number }>
  rating: number | null
  reviewCount: number
}

type SeoCollection = {
  slug: string
  name: string
  description: string
  shortDescription: string | null
  seoTitle?: string | null
  seoDescription?: string | null
  heroImageUrl: string | null
  cardImageUrl: string | null
  products?: Array<{ slug: string; name: string }>
}

function escapeAttribute(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

function renderSeoHtml(template: string, metadata: { title: string; description: string; canonical: string; image: string; type: 'product' | 'website'; structuredData: Record<string, unknown> }) {
  const title = escapeAttribute(metadata.title)
  const description = escapeAttribute(metadata.description)
  const canonical = escapeAttribute(metadata.canonical)
  const image = escapeAttribute(metadata.image)
  const jsonLd = JSON.stringify(metadata.structuredData).replaceAll('<', '\\u003c')
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${description}" />`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta property="og:type"[^>]*>/, `<meta property="og:type" content="${metadata.type}" />`)
    .replace(/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${image}" />`)
    .replace('</head>', `    <link rel="canonical" href="${canonical}" />\n    <meta property="og:url" content="${canonical}" />\n    <meta name="twitter:title" content="${title}" />\n    <meta name="twitter:description" content="${description}" />\n    <meta name="twitter:image" content="${image}" />\n    <script type="application/ld+json">${jsonLd}</script>\n  </head>`)
}

function absoluteAssetUrl(value: string, siteUrl: string, apiUrl: string) {
  return new URL(value, value.startsWith('/uploads/') ? new URL(apiUrl).origin : `${siteUrl}/`).href
}

async function writeRouteHtml(outputDirectory: string, path: string, html: string) {
  const directory = resolve(outputDirectory, path.replace(/^\//, ''))
  await mkdir(directory, { recursive: true })
  await writeFile(resolve(directory, 'index.html'), html)
}

async function prerenderCatalogue(outputDirectory: string, siteUrl: string, apiUrl: string) {
  const template = await readFile(resolve(outputDirectory, 'index.html'), 'utf8')
  const products: SeoProduct[] = []
  let page = 1
  let totalPages = 1
  do {
    const response = await fetch(`${apiUrl}/products?limit=48&page=${page}`)
    if (!response.ok) throw new Error(`Product SEO request returned ${response.status}`)
    const payload = await response.json() as { data: SeoProduct[]; totalPages: number }
    products.push(...payload.data)
    totalPages = payload.totalPages
    page += 1
  } while (page <= totalPages)

  const collectionResponse = await fetch(`${apiUrl}/collections`)
  if (!collectionResponse.ok) throw new Error(`Collection SEO request returned ${collectionResponse.status}`)
  const collectionList = await collectionResponse.json() as { data: SeoCollection[] }
  const collections = await Promise.all(collectionList.data.map(async (collection) => {
    const response = await fetch(`${apiUrl}/collections/${encodeURIComponent(collection.slug)}`)
    if (!response.ok) throw new Error(`Collection ${collection.slug} SEO request returned ${response.status}`)
    return (await response.json() as { data: SeoCollection }).data
  }))

  await Promise.all([
    ...products.map((product) => {
      const canonical = `${siteUrl}/products/${product.slug}`
      const primaryImage = product.images.find((image) => image.isPrimary) ?? product.images[0]
      const image = absoluteAssetUrl(primaryImage?.url ?? '/images/hero/home_hero_frost.png', siteUrl, apiUrl)
      const structuredData = {
        '@context': 'https://schema.org', '@type': 'Product',
        name: product.name, description: product.description, image: [image], url: canonical,
        brand: { '@type': 'Brand', name: 'AVELIS' },
        offers: product.variants.map((variant) => ({ '@type': 'Offer', sku: variant.sku, price: variant.price.toFixed(2), priceCurrency: 'EUR', availability: `https://schema.org/${variant.stock > 0 ? 'InStock' : 'OutOfStock'}`, url: canonical })),
        ...(product.rating !== null && product.reviewCount > 0 ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: product.rating, reviewCount: product.reviewCount } } : {}),
      }
      return writeRouteHtml(outputDirectory, `/products/${product.slug}`, renderSeoHtml(template, { title: `${product.name} Eau de Parfum | AVELIS`, description: product.subtitle || product.description, canonical, image, type: 'product', structuredData }))
    }),
    ...collections.map((collection) => {
      const canonical = `${siteUrl}/collections/${collection.slug}`
      const image = absoluteAssetUrl(collection.heroImageUrl ?? collection.cardImageUrl ?? '/images/hero/home_hero_frost.png', siteUrl, apiUrl)
      const structuredData = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: collection.seoTitle ?? collection.name, description: collection.seoDescription ?? collection.shortDescription ?? collection.description, url: canonical, image, mainEntity: { '@type': 'ItemList', itemListElement: (collection.products ?? []).map((product, index) => ({ '@type': 'ListItem', position: index + 1, name: product.name, item: `${siteUrl}/products/${product.slug}` })) } }
      return writeRouteHtml(outputDirectory, `/collections/${collection.slug}`, renderSeoHtml(template, { title: `${collection.seoTitle ?? collection.name} | AVELIS`, description: collection.seoDescription ?? collection.shortDescription ?? collection.description, canonical, image, type: 'website', structuredData }))
    }),
  ])
}

function seoDiscoveryPlugin(environment: Record<string, string>): Plugin {
  return {
    name: 'avelis-seo-discovery',
    apply: 'build',
    async closeBundle() {
      const siteUrl = environment.VITE_SITE_URL.replace(/\/$/, '')
      const apiUrl = environment.VITE_API_URL.replace(/\/$/, '')
      const outputDirectory = resolve(process.cwd(), 'dist')
      await mkdir(outputDirectory, { recursive: true })
      await Promise.all([
        writeFile(
          resolve(outputDirectory, 'robots.txt'),
          `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /account\nDisallow: /checkout\nSitemap: ${siteUrl}/sitemap.xml\n`,
        ),
        writeFile(
          resolve(outputDirectory, 'sitemap.xml'),
          `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap><loc>${apiUrl}/seo/sitemap.xml</loc></sitemap>\n</sitemapindex>\n`,
        ),
      ])
      try {
        await prerenderCatalogue(outputDirectory, siteUrl, apiUrl)
      } catch (error) {
        console.warn(`[avelis-seo] Dynamic catalogue prerender skipped: ${error instanceof Error ? error.message : String(error)}`)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const environment = loadEnv(mode, process.cwd(), '')

  if (command === 'build') {
    const result = productionEnvironmentSchema.safeParse(environment)

    if (!result.success) {
      const details = result.error.issues
        .map((issue) => `- ${issue.path.join('.')}: ${issue.message}`)
        .join('\n')

      throw new Error(`Invalid client build environment:\n${details}`)
    }
  }

  return {
    plugins: [react(), seoDiscoveryPlugin(environment)],
    server: {
      host: 'localhost',
      port: 5174,
      strictPort: true,
    },
  }
})
