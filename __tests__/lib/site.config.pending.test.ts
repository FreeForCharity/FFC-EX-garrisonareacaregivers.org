import { isPending, PENDING_TEXT, siteConfig, type PendingField } from '../../src/lib/site.config'
import { team } from '../../src/data/team'

// The `pending` convention, ported from
// FreeForCharity/FFC-IN-FFC_Single_Page_Template#483: a pending field must
// carry no value, so no placeholder or borrowed (template / Free For Charity)
// value can ship behind the "awaiting information" notice.
const PENDING_IS_EMPTY: Record<PendingField, () => boolean> = {
  email: () => siteConfig.contactEmail.trim() === '',
  phone: () => siteConfig.phone.display.trim() === '' && siteConfig.phone.tel.trim() === '',
  address: () => siteConfig.addresses.length === 0,
  ein: () => siteConfig.ein.trim() === '',
  guidestar: () =>
    siteConfig.guidestar.profileUrl.trim() === '' &&
    siteConfig.guidestar.directProfileUrl.trim() === '',
  social: () => siteConfig.social.every((s) => s.href.trim() === ''),
  team: () => team.length === 0,
  donationUrl: () => siteConfig.donationUrl.trim() === '',
  volunteerUrl: () => siteConfig.volunteerUrl.trim() === '',
}

describe('siteConfig.pending contract', () => {
  it('lists only known fields, once each, and each with an empty value', () => {
    const pending = siteConfig.pending ?? []
    expect(new Set(pending).size).toBe(pending.length)
    for (const field of pending) {
      expect(Object.keys(PENDING_IS_EMPTY)).toContain(field)
      expect(PENDING_IS_EMPTY[field]()).toBe(true)
    }
  })

  it('carries a well-formed EIN and email, or empty ones while they are pending', () => {
    expect(siteConfig.ein).toMatch(isPending('ein') ? /^$/ : /^\d{2}-\d{7}$/)
    expect(siteConfig.contactEmail).toMatch(
      isPending('email') ? /^$/ : /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    )
  })

  it("carries none of Free For Charity's own identity values", () => {
    const text = JSON.stringify({ ...siteConfig, supportedBy: undefined })
    for (const re of [/46-?2471893/, /520[\s.-]?222[\s.-]?8104/, /bbbe173a/, /freeforcharity/i]) {
      expect(text).not.toMatch(re)
    }
    expect(JSON.stringify(team)).not.toMatch(/Clarke Moyer|Free For Charity/)
  })

  it('serves from the custom domain the Pages site is bound to', () => {
    expect(siteConfig.url).toBe('https://garrisonareacaregivers.org')
  })

  it('exposes the visible placeholder text', () => {
    expect(PENDING_TEXT).toBe('Awaiting information from the charity')
  })
})
