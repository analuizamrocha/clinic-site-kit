import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { getPublishedServices } from '@/lib/site'
import type { ArticleSource } from '@/lib/site/types'

export interface Post {
  slug: string
  title: string
  description: string
  publishDate: string
  lastModified: string
  lastReviewed?: string
  indexable: boolean
  relatedServiceSlugs: string[]
  sources?: ArticleSource[]
  body: string
}

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

const toIsoDate = (value: unknown) => (value instanceof Date ? value.toISOString().slice(0, 10) : String(value ?? ''))

/** Posts fail loudly at build, like the site config: no half-filled article ships. */
export const validatePost = (post: Post, serviceSlugs: Set<string>) => {
  const problems: string[] = []
  const add = (field: string, detail: string) => problems.push(`posts/${post.slug}.${field}: ${detail}`)
  for (const field of ['title', 'description', 'body'] as const) if (!post[field]?.trim()) add(field, 'is required')
  if (post.description.length > 160) add('description', 'exceeds 160 characters')
  for (const field of ['publishDate', 'lastModified'] as const) if (!ISO_DATE.test(post[field])) add(field, 'must be YYYY-MM-DD')
  if (post.lastModified < post.publishDate) add('lastModified', 'predates publishDate')
  if (post.lastReviewed && !ISO_DATE.test(post.lastReviewed)) add('lastReviewed', 'must be YYYY-MM-DD')
  if (typeof post.indexable !== 'boolean') add('indexable', 'must be a boolean')
  for (const slug of post.relatedServiceSlugs) if (!serviceSlugs.has(slug)) add('relatedServiceSlugs', `unknown or unpublished service ${slug}`)
  if (/\b(TODO|PREENCHER|lorem)\b/i.test(post.body)) add('body', 'contains a placeholder')
  return problems
}

const parse = (filename: string): Post => {
  const { data, content } = matter(fs.readFileSync(path.join(POSTS_DIR, filename), 'utf8'))
  const slug = filename.replace(/\.md$/, '')
  if (data.slug && data.slug !== slug) throw new Error(`posts/${filename}: slug must match the filename`)
  return {
    slug,
    title: String(data.title ?? ''),
    description: String(data.description ?? ''),
    publishDate: toIsoDate(data.publishDate),
    lastModified: toIsoDate(data.lastModified ?? data.publishDate),
    ...(data.lastReviewed ? { lastReviewed: toIsoDate(data.lastReviewed) } : {}),
    indexable: data.indexable,
    relatedServiceSlugs: Array.isArray(data.relatedServiceSlugs) ? data.relatedServiceSlugs : [],
    ...(Array.isArray(data.sources) ? { sources: data.sources } : {}),
    body: content.trim(),
  }
}

export const getAllPosts = (): Post[] => {
  if (!fs.existsSync(POSTS_DIR)) return []
  const posts = fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith('.md')).map(parse)
  const serviceSlugs = new Set(getPublishedServices().map((service) => service.slug))
  const problems = posts.flatMap((post) => validatePost(post, serviceSlugs))
  if (problems.length) throw new Error(`Invalid posts:\n- ${problems.join('\n- ')}`)
  return posts.toSorted((a, b) => b.publishDate.localeCompare(a.publishDate))
}

export const getPost = (slug: string) => getAllPosts().find((post) => post.slug === slug)

export const getPostsForService = (serviceSlug: string) =>
  getAllPosts().filter((post) => post.relatedServiceSlugs.includes(serviceSlug))
