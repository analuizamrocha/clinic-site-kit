/** Serialises structured data safely: `<` is escaped so content cannot close the script tag. */
export const JsonLd = ({ data }: { data: object | null }) => {
  if (!data) return null
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
