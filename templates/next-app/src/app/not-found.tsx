import Link from 'next/link'

const NotFound = () => (
  <div className="container-page py-20 text-center">
    <h1 className="text-4xl font-semibold">Página não encontrada</h1>
    <p className="mt-3 text-text/85">O endereço pode ter mudado.</p>
    <Link href="/" className="btn btn-primary mt-6">
      Voltar ao início
    </Link>
  </div>
)

export default NotFound
