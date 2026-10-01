/**
 * Central site configuration for this FFC-supported nonprofit site.
 *
 * EDIT THIS FILE to customize a new FFC-supported nonprofit site.
 * Most values that vary between sites flow from here so individual
 * pages, metadata, sitemap, robots, and security headers stay in sync.
 *
 * After editing, run `npm run check:drift` to verify nothing here drifts
 * away from FFC best practices (placeholder URLs left in, etc.).
 */

export type SiteSocialLink = {
  /** Display label, also used for aria-label. */
  label: string
  /** Absolute https URL. Empty string disables the link. */
  href: string
}

export type SiteAddress = {
  /** Heading shown above the address (e.g. "Main Address"). */
  label: string
  /** Address text, one entry per visual line. */
  lines: readonly string[]
  /** Google Maps (or other) link opened when the address is clicked. */
  mapUrl: string
}

/**
 * A footer-standard field the charity has not supplied yet. Listing a field in
 * `siteConfig.pending` renders a visible "awaiting information" placeholder in
 * its place (plain text, never a link), so a gap in the FFC footer standard is
 * a call to action on the page rather than a silent omission. The field's own
 * value must stay EMPTY while it is pending, so no placeholder or borrowed
 * value (e.g. the template's supporting-organization details) can ship behind it.
 *
 * An empty value that is NOT listed here keeps its plain meaning: the charity
 * has none (e.g. no public phone). `taxStatusLabel` is deliberately not a
 * pending field: it is a legal claim, and '' means "make no claim".
 *
 * What "empty" means per field: `email` → `contactEmail`; `phone` → both
 * `phone.display` and `phone.tel`; `address` → `addresses: []`; `ein` → `ein`;
 * `guidestar` → both `guidestar` URLs; `social` → every `social[].href`;
 * `team` → no member in src/data/team/*.json has a name; `donationUrl` /
 * `volunteerUrl` → that URL. (Ported from
 * FreeForCharity/FFC-IN-FFC_Single_Page_Template#483.)
 */
export type PendingField =
  | 'email'
  | 'phone'
  | 'address'
  | 'ein'
  | 'guidestar'
  | 'social'
  | 'team'
  | 'donationUrl'
  | 'volunteerUrl'

/** Visible text shown in place of a pending field. */
export const PENDING_TEXT = 'Awaiting information from the charity'

export type SiteConfig = {
  /** Display name of the charity (used in titles, OG/Twitter cards). */
  name: string
  /** Short tagline used in the default title template. */
  tagline: string
  /** Plain-language description used for the <meta description> tag. */
  description: string
  /**
   * Shorter description tuned for OG/Twitter social card previews.
   * Falls back to `description` if empty. Aim for <= 200 chars and avoid
   * em-dashes — some card renderers break on them.
   */
  shortDescription: string
  /**
   * Canonical production URL with no trailing slash.
   * Used by metadataBase, sitemap, and robots. The drift check verifies that
   * this is updated whenever public/CNAME points to a custom domain, and
   * that public/.well-known/security.txt no longer carries the placeholder.
   */
  url: string
  /**
   * Twitter / X handle including the leading @ — e.g. `@freeforcharity`.
   * Empty string omits the twitter:site meta entirely. Handles without `@`
   * are auto-prefixed so a typo doesn't silently break attribution.
   */
  twitterHandle: string
  /**
   * Primary contact email. Used by your own pages; security.txt carries
   * its own `Contact:` line and is not auto-derived from this value.
   * Keep them in sync manually when you change either.
   */
  contactEmail: string
  /** SEO keywords used in the root layout metadata. */
  keywords: readonly string[]
  /** Default theme color (used by manifest and meta tag). */
  themeColor: string
  /** Where the vulnerability disclosure policy lives on this site. */
  vulnerabilityDisclosurePath: string
  /** Social links displayed in the footer. */
  social: readonly SiteSocialLink[]
  /** IRS Employer Identification Number (tax ID), e.g. '12-3456789'. */
  ein: string
  /**
   * Primary phone number. `display` is the human-readable form shown to users;
   * `tel` is the value used in the `tel:` link (digits, optionally E.164).
   */
  phone: { display: string; tel: string }
  /** Physical addresses shown in the footer contact column. */
  addresses: readonly SiteAddress[]
  /** GuideStar / Candid transparency profile links shown in the footer. */
  guidestar: { profileUrl: string; directProfileUrl: string }
  /** The charity's donation page (https). */
  donationUrl: string
  /** The charity's volunteer page (https). */
  volunteerUrl: string
  /**
   * Label appended after the org name in the footer copyright line to describe
   * tax status, e.g. 'a US 501c3 Non Profit'. Empty string makes no claim.
   */
  taxStatusLabel: string
  /**
   * Permanent attribution to the supporting organization (FFC): the
   * always-rendered "Supported by" clause and the "Supported Charity Login"
   * hub link. Part of the FFC footer standard — do not remove or repoint.
   */
  supportedBy: { name: string; url: string; hubUrl: string }
  /**
   * Footer-standard fields still awaiting the charity. Each listed field keeps
   * an EMPTY value and renders a visible plain-text placeholder
   * (`PENDING_TEXT`) in its slot, never a link. An empty value NOT listed here
   * means "the charity has none". `taxStatusLabel` is deliberately not
   * pending-able: it is a legal claim, so '' means "make no claim". See
   * `PendingField`. Omit (or leave empty) when nothing is pending.
   */
  pending?: readonly PendingField[]
}

export const siteConfig: SiteConfig = {
  // Every value below is what Garrison Area Caregivers publishes on its own site
  // (site/, served at https://garrisonareacaregivers.org) or the IRS record.
  name: 'Garrison Area Caregivers',
  tagline: 'Food Shelf & Thrift Store',
  description:
    'Garrison Area Caregivers provides services in the Garrison area that help people with basic needs such as food and clothing, coordinates volunteers, develops support programs as needs arise, and promotes the present system of services through networking and information sharing.',
  shortDescription:
    "A community organization serving neighbors in difficult life circumstances through Dorothy's Rainbow Food Shelf and Thrift Store in Garrison, MN.",
  // The site is served from site/ on GitHub Pages at this custom domain
  // (site/CNAME, public/CNAME and the Pages binding all agree).
  url: 'https://garrisonareacaregivers.org',
  twitterHandle: '',
  // No organization email is published (the About page lists board members'
  // personal addresses, which are not a public footer contact): pending.
  contactEmail: '',
  keywords: [
    'Garrison Area Caregivers',
    "Dorothy's Rainbow",
    'food shelf',
    'thrift store',
    'Garrison MN',
    'volunteer',
    'donate',
  ],
  themeColor: '#ffffff',
  vulnerabilityDisclosurePath: '/vulnerability-disclosure-policy',
  social: [
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/p/Garrison-Area-Caregivers-100068486887141',
    },
  ],
  // Published on the Donations page; confirmed on ProPublica.
  ein: '20-2899659',
  // The Visit & Contact page's contact number.
  phone: { display: '(320) 692-5399', tel: '3206925399' },
  addresses: [
    {
      label: "Dorothy's Rainbow",
      lines: ['9541 Madison Street', 'Garrison, MN'],
      mapUrl:
        'https://www.google.com/maps/search/?api=1&query=9541%20Madison%20Street%2C%20Garrison%2C%20MN',
    },
  ],
  // The charity's own Candid profile, linked with its Gold seal on the site.
  guidestar: {
    profileUrl:
      'https://app.candid.org/profile/7011528/garrison-area-caregivers-inc-20-2899659/?pkId=35625f98-b751-4deb-adeb-665ea82495d9',
    directProfileUrl:
      'https://app.candid.org/profile/7011528/garrison-area-caregivers-inc-20-2899659/?pkId=35625f98-b751-4deb-adeb-665ea82495d9',
  },
  // The charity's own Donations and Volunteer pages.
  donationUrl: 'https://garrisonareacaregivers.org/donations.html',
  volunteerUrl: 'https://garrisonareacaregivers.org/volunteer.html',
  taxStatusLabel: 'a US 501c3 Non Profit',
  supportedBy: {
    name: 'Free For Charity',
    url: 'https://freeforcharity.org',
    hubUrl: 'https://freeforcharity.org/hub/',
  },
  // Footer-standard fields still awaiting the charity; each renders a visible
  // 'awaiting information' placeholder until it is filled in.
  pending: ['email'],
}

/**
 * Compose a fully-qualified URL on this site.
 *
 * The path is required to be a same-origin absolute path (starting with `/`).
 * This rules out protocol-relative inputs like `//evil.com` that could leak
 * into a future redirect or canonical link.
 */
export function siteUrl(path = '/'): string {
  if (typeof path !== 'string' || !path.startsWith('/') || path.startsWith('//')) {
    throw new TypeError(
      `siteUrl: path must be a same-origin absolute path starting with a single "/" (got: ${JSON.stringify(path)})`
    )
  }
  const base = siteConfig.url.replace(/\/$/, '')
  return `${base}${path}`
}

/**
 * Returns the Twitter handle with a guaranteed leading `@`.
 * Returns `undefined` (so the meta tag is omitted) if the handle is empty
 * or is just an `@` with no body — emitting a bare `@` would advertise a
 * malformed handle to Twitter's scraper.
 */
export function twitterSite(): string | undefined {
  const raw = siteConfig.twitterHandle.trim().replace(/^@+/, '')
  if (!raw) return undefined
  return `@${raw}`
}

/** Returns the OG/Twitter card description, falling back to the longer page description. */
export function cardDescription(): string {
  return siteConfig.shortDescription.trim() || siteConfig.description
}

/** True when `field` is listed in `siteConfig.pending`. */
export function isPending(field: PendingField): boolean {
  return siteConfig.pending?.includes(field) ?? false
}

/**
 * The charity's published phone number (both `display` and `tel` set), or
 * null. A pending or missing number is never shown as a dialable link.
 */
export function publishedPhone(): { display: string; tel: string } | null {
  if (isPending('phone')) return null
  const display = siteConfig.phone.display.trim()
  const tel = siteConfig.phone.tel.trim()
  return display && tel ? { display, tel } : null
}
