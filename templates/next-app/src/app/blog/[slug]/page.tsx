import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Byline } from '@/components/Byline'
import { CtaCard } from '@/components/CtaCard'
import { JsonLd } from '@/components/JsonLd'
import { Sources } from '@/components/Sources'
import { getAllPosts, getPost, searchTitle } from '@/lib/blog'
import { buildMetadata } from '@/lib/metadata'
import { articlePage } from '@/lib/schema'
import { getService, primaryContact } from '@/lib/site'
import type { Service } from '@/lib/site/types'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export const generateStaticParams = () => getAllPosts().map((post) => ({ slug: post.slug }))

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const post = getPost((await params).slug)
  if (!post) return {}
  return buildMetadata({ title: searchTitle(post), description: post.description, path: `/blog/${post.slug}`, indexable: post.indexable })
}

const ArticlePage = async ({ params }: Props) => {
  const post = getPost((await params).slug)
  if (!post) notFound()
  const services = post.relatedServiceSlugs.map(getService).filter((service): service is Service => Boolean(service))

  return (
    <article className="container-page max-w-3xl py-10">
      {post.indexable ? <JsonLd data={articlePage(post)} /> : null}
      <Breadcrumb items={[{ name: 'Início', path: '/' }, { name: 'Blog', path: '/blog' }, { name: post.title }]} />
      <header className="mt-4 border-b border-text/10 pb-6">
        <h1 className="text-4xl font-semibold">{post.title}</h1>
        <p className="mt-3 text-lg text-text/85">{post.description}</p>
        <Byline lastModified={post.lastModified} lastReviewed={post.lastReviewed} />
      </header>
      <div className="mt-8 space-y-4 text-lg leading-relaxed text-text/90 [&_a]:text-primary [&_a]:underline [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_ul]:list-disc [&_ul]:pl-6">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
      </div>
      <Sources sources={post.sources} />
      {services.map((service) => (
        <aside key={service.slug} aria-labelledby={`relacionado-${service.slug}`} className="card mt-10">
          <p className="eyebrow">Tratamento relacionado</p>
          <h2 id={`relacionado-${service.slug}`} className="mt-1 text-2xl font-semibold">
            {service.title}
          </h2>
          <p className="mt-2 text-text/85">{service.summary}</p>
          <Link href={`/tratamentos/${service.slug}`} className="mt-3 inline-flex min-h-11 items-center font-semibold text-primary">
            Conhecer o tratamento
          </Link>
        </aside>
      ))}
      <div className="mt-10">
        <CtaCard
          contact={primaryContact()}
          placement="article-end"
          title="Precisa de avaliação?"
          body="Este conteúdo é educativo. Para entender o seu caso, agende uma consulta."
        />
      </div>
    </article>
  )
}

export default ArticlePage
