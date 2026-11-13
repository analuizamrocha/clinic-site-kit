import type { Practitioner } from '@/lib/site/types'

/**
 * Phrases, not tokens. "não é garantido" and "não é o único caminho" are
 * educational and must pass. A profession adds its own list in the compliance
 * doc; this is only the floor the starter can check without a researched rule.
 */
export const BANNED_ADVERTISING_PHRASES = [
  'resultado garantido',
  'resultados garantidos',
  'o melhor',
  'a melhor',
  'milagroso',
  'milagrosa',
  'revolucionário',
  'revolucionária',
  'técnica exclusiva',
  'tratamento exclusivo',
  'método exclusivo',
]

const NEGATIVE_PREFIX = /(?:não é |não |sem )$/

/** The banned phrase, unless the words immediately before it negate it. */
export const findBannedAdvertisingPhrase = (text: string) => {
  const lowered = text.toLocaleLowerCase('pt-BR')
  for (const phrase of BANNED_ADVERTISING_PHRASES) {
    let from = 0
    while (from < lowered.length) {
      const at = lowered.indexOf(phrase, from)
      if (at < 0) break
      const before = lowered.slice(Math.max(0, at - 16), at)
      if (!NEGATIVE_PREFIX.test(before)) return phrase
      from = at + phrase.length
    }
  }
  return undefined
}

/** Identification lives in the ending of the post, read from the brief, never hardcoded. */
export const identificationProblems = (
  body: string,
  practitioner: Pick<Practitioner, 'displayName' | 'specialty' | 'council' | 'rqe'>,
) => {
  const footer = body.slice(-800)
  const problems: string[] = []
  if (!footer.includes(practitioner.displayName)) problems.push('footer is missing the practitioner name')
  if (!footer.includes(practitioner.specialty)) problems.push('footer is missing the specialty')
  const { body: council, region, number } = practitioner.council
  if (!footer.includes(council) || !footer.includes(region) || !footer.includes(number)) {
    problems.push(`footer is missing the council registration ${council}-${region} ${number}`)
  }
  for (const rqe of practitioner.rqe) {
    if (!footer.includes(rqe)) problems.push(`footer is missing the specialist number ${rqe}`)
  }
  return problems
}
