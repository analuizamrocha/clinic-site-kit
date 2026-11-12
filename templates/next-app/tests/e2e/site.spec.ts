import { expect, test } from '@playwright/test'
import { contactHref } from '../../src/lib/contact-links'
import { getIndexablePages } from '../../src/lib/discovery'
import { findClinicalTerm } from '../../src/lib/site/validate'
import config from '../../site/site.config'

const ALLOWED_DESTINATIONS = new Set(config.contacts.map(contactHref))
const PAGES = [...getIndexablePages().map((page) => page.path), '/politica-privacidade']

test.beforeEach(async ({ context }) => {
  // Nothing in this suite may reach WhatsApp or a tag manager.
  await context.route(/^https:\/\/(wa\.me|api\.whatsapp\.com|www\.googletagmanager\.com)\//, (route) => route.abort())
})

for (const path of PAGES) {
  test(`${path}: one H1, configured contacts only, no overflow, 44px targets`, async ({ page }) => {
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)

    const contacts = await page
      .locator('a[href^="https://wa.me/"], a[href^="tel:"]')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href') ?? ''))
    for (const href of contacts) {
      expect(ALLOWED_DESTINATIONS.has(href), href).toBe(true)
      const message = new URL(href, 'https://x').searchParams.get('text') ?? ''
      expect(findClinicalTerm(message), href).toBeUndefined()
    }

    expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false)

    for (const box of await page.locator('a[data-conversion]:visible').evaluateAll((links) =>
      links.map((link) => link.getBoundingClientRect()).map(({ width, height }) => ({ width, height })),
    )) {
      expect(Math.min(box.width, box.height)).toBeGreaterThanOrEqual(44)
    }
  })
}

test('an unknown path returns the 404 page', async ({ page }) => {
  const response = await page.goto('/caminho-que-nao-existe')
  expect(response?.status()).toBe(404)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Página não encontrada')
})

test('no third-party script loads without a configured GTM id and consent', async ({ page }) => {
  const thirdParty: string[] = []
  page.on('request', (request) => {
    if (!request.url().startsWith('http://127.0.0.1')) thirdParty.push(request.url())
  })
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  expect(thirdParty.filter((url) => !url.startsWith('data:'))).toEqual([])
  await expect(page.getByRole('region', { name: 'Consentimento de cookies' })).toHaveCount(0)
})

test('mobile menu reaches every section without JavaScript', async ({ browser, isMobile }) => {
  test.skip(!isMobile, 'the disclosure menu is the phone/tablet navigation')
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } })
  const page = await context.newPage()
  await page.goto('/')
  await page.locator('header summary').click()
  await page.getByRole('navigation', { name: 'Menu' }).getByRole('link', { name: 'Tratamentos' }).click()
  await expect(page).toHaveURL(/\/tratamentos$/)
  await context.close()
})

test('a fictional site is not crawlable', async ({ request }) => {
  const robots = await (await request.get('/robots.txt')).text()
  expect(robots).toMatch(/Disallow: \//)
})
