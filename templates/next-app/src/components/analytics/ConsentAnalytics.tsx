'use client'

import { GoogleTagManager } from '@next/third-parties/google'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CONSENT_EVENT, type ConsentState, readConsent, writeConsent } from '@/lib/consent'
import { describeConversion } from '@/lib/conversion'

type DataLayerWindow = Window & { dataLayer?: unknown[] }

/**
 * Consent banner + GTM + conversion events, as one unit so none of them can
 * run without the others' guarantees. With no GTM id configured there is
 * nothing to consent to: no banner, no script, no events.
 */
export const ConsentAnalytics = ({ gtmId }: { gtmId?: string }) => {
  const [consent, setConsent] = useState<ConsentState>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const sync = () => {
      setConsent(readConsent())
      setReady(true)
    }
    sync()
    window.addEventListener(CONSENT_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(CONSENT_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  useEffect(() => {
    if (!gtmId || consent !== 'accepted') return
    const handleClick = (event: MouseEvent) => {
      const anchor = event.target instanceof Element ? event.target.closest('a') : null
      const conversion = anchor ? describeConversion(anchor) : null
      if (!conversion) return
      const layer = ((window as DataLayerWindow).dataLayer ??= [])
      layer.push(conversion)
    }
    document.addEventListener('click', handleClick, { capture: true })
    return () => document.removeEventListener('click', handleClick, { capture: true })
  }, [gtmId, consent])

  if (!gtmId || !ready) return null
  if (consent === 'accepted') return <GoogleTagManager gtmId={gtmId} />
  if (consent === 'rejected') return null

  return (
    <section
      role="region"
      aria-label="Consentimento de cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-text/10 bg-background p-4 shadow-2xl sm:inset-x-auto sm:right-4 sm:bottom-4 sm:max-w-sm sm:rounded-2xl sm:border"
    >
      <p className="text-sm text-text/90">
        Usamos cookies de medição de audiência para melhorar o site, só com a sua permissão.{' '}
        <Link href="/politica-privacidade" className="text-primary underline">
          Saiba mais
        </Link>
        .
      </p>
      {/* Accept and reject carry equal weight: consent must be as easy to refuse as to give. */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button type="button" className="btn btn-secondary" onClick={() => writeConsent('rejected')}>
          Recusar
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => writeConsent('accepted')}>
          Aceitar
        </button>
      </div>
    </section>
  )
}
