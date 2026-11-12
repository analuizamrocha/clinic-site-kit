export const CONSENT_KEY = 'lgpd-cookie-consent'
export const CONSENT_EVENT = 'lgpd-consent-updated'

export type ConsentState = 'accepted' | 'rejected' | null

/** Storage can throw (private mode, blocked site data): treat that as "no decision". */
export const readConsent = (): ConsentState => {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY)
    return value === 'accepted' || value === 'rejected' ? value : null
  } catch {
    return null
  }
}

export const writeConsent = (value: Exclude<ConsentState, null>) => {
  try {
    window.localStorage.setItem(CONSENT_KEY, value)
  } catch {
    // Without storage the choice lasts for this page only; analytics stays off on reload.
  }
  window.dispatchEvent(new Event(CONSENT_EVENT))
}

export const clearConsent = () => {
  try {
    window.localStorage.removeItem(CONSENT_KEY)
  } catch {}
  window.dispatchEvent(new Event(CONSENT_EVENT))
}
