import Link from 'next/link'
import { Breadcrumb } from '@/components/Breadcrumb'
import { getAllPosts } from '@/lib/blog'
import { formatDate } from '@/lib/format'
import { buildMetadata } from '@/lib/metadata'
import { site } from '@/lib/site'

export const metadata = buildMetadata({
  title: 'Blog',
  description: `Conteúdo educativo de ${site.practitioner.displayName}.`,
  path: '/blog',
})

const BlogPage = () => (
  <div className="container-page py-10">
    <Breadcrumb items={[{ name: 'Início', path: '/' }, { name: 'Blog' }]} />
    <h1 className="mt-4 text-4xl font-semibold">Blog</h1>
    <ul className="mt-8 grid gap-4 md:grid-cols-2">
      {getAllPosts().map((post) => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}`} className="card block h-full hover:-translate-y-0.5">
            <time dateTime={post.publishDate} className="text-sm text-muted">
              {formatDate(post.publishDate)}
            </time>
            <h2 className="mt-1 text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-text/85">{post.description}</p>
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export default BlogPage
