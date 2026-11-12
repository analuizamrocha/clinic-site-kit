import type { NextConfig } from 'next'
import config from './site/site.config'

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'] },
  headers: async () => [{ source: '/:path*', headers: securityHeaders }],
  // Declared in the site config (validated there) so a redirect is client data,
  // reviewed with the rest of the facts, not a framework detail.
  redirects: async () =>
    (config.redirects ?? []).map(({ from, to }) => ({ source: from, destination: to, permanent: true })),
}

export default nextConfig
