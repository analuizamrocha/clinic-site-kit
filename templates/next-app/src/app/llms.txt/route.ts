import { renderLlmsTxt } from '@/lib/discovery'

export const dynamic = 'force-static'

export const GET = () =>
  new Response(renderLlmsTxt(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
