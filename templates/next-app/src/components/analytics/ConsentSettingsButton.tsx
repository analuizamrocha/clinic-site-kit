'use client'

import { clearConsent } from '@/lib/consent'

/** Lets a visitor revisit the choice at any time; the banner reappears. */
export const ConsentSettingsButton = () => (
  <button
    type="button"
    onClick={() => {
      clearConsent()
      window.location.reload()
    }}
    className="inline-flex min-h-11 cursor-pointer items-center text-left hover:text-primary"
  >
    Preferências de cookies
  </button>
)
