import type { ArticleSource } from '@/lib/site/types'

export const Sources = ({ sources }: { sources?: ArticleSource[] }) => {
  if (!sources?.length) return null
  return (
    <section aria-labelledby="referencias" className="mt-10">
      <h2 id="referencias" className="text-2xl font-semibold">
        Referências
      </h2>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-text/85">
        {sources.map((source) => (
          <li key={`${source.title}-${source.url ?? ''}`}>
            {source.url ? (
              <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                {source.title}
              </a>
            ) : (
              source.title
            )}
            {[source.publisher, source.year].filter(Boolean).length
              ? `. ${[source.publisher, source.year].filter(Boolean).join(', ')}.`
              : null}
          </li>
        ))}
      </ol>
    </section>
  )
}
