'use client'

import React from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, ArrowRight, Link2 } from 'lucide-react'

import { FaFacebookF, FaLinkedinIn, FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import type { LucideIcon } from 'lucide-react'

import { PENDING_TEXT, isPending, publishedPhone, siteConfig } from '@/lib/site.config'

// Footer-standard placeholder (siteConfig.pending): plain text, never a link.
// Ported from FreeForCharity/FFC-IN-FFC_Single_Page_Template#483.
const PendingNote = () => (
  <span className="block italic text-[15px] text-gray-300">{PENDING_TEXT}</span>
)

// Maps a social link's label (as defined in siteConfig.social) to an icon.
// Unknown labels fall back to a generic link icon (Link2 from lucide-react)
// so a charity that adds a new social network — Bluesky, Mastodon, YouTube,
// etc. — gets a sensible placeholder instead of a misleading GitHub mark.
const socialIconByLabel: Record<string, IconType | LucideIcon> = {
  Facebook: FaFacebookF,
  'X (Twitter)': FaXTwitter,
  Twitter: FaXTwitter,
  X: FaXTwitter,
  LinkedIn: FaLinkedinIn,
  GitHub: FaGithub,
}

const Footer: React.FC = () => {
  const currentYear = React.useMemo(() => new Date().getFullYear(), [])
  const socialLinks = siteConfig.social.filter((s) => s.href.trim())
  const email = siteConfig.contactEmail.trim()
  const ein = siteConfig.ein.trim()
  const phone = publishedPhone()
  const guidestarProfileUrl = siteConfig.guidestar.profileUrl.trim()
  const guidestarDirectUrl = siteConfig.guidestar.directProfileUrl.trim()
  const taxStatusLabel = siteConfig.taxStatusLabel.trim()
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-12 px-4 md:px-6 lg:px-8">
        {/* Column 1: Endorsements */}
        <div className="space-y-6 px-4 sm:px-0">
          <h3 className="text-[28px] text-white">Endorsements</h3>

          <div className="space-y-4">
            {guidestarProfileUrl && (
              <a
                href={guidestarProfileUrl}
                aria-label={`View ${siteConfig.name} GuideStar Profile`}
              >
                {/* The charity's own Candid seal (Gold), as the live site shows it —
                    not the template's Platinum seal image. */}
                <img
                  src="https://widgets.guidestar.org/prod/v1/pdp/transparency-seal/7011528/svg"
                  alt="Candid Gold Seal of Transparency"
                  width={108}
                  height={108}
                />
              </a>
            )}
            {isPending('guidestar') && (
              <div>
                <p className="font-[500] text-[22px]">GuideStar / Candid Profile</p>
                <PendingNote />
              </div>
            )}
            {guidestarDirectUrl && (
              <Link
                href={guidestarDirectUrl}
                className="group relative my-4 flex w-full max-w-[230px] items-center justify-between
                  border-2 border-[#2ea3f2] bg-black px-5 py-2.5 text-[#2ea3f2]
                  transition-all duration-300 hover:border-transparent"
                id="aria-font"
              >
                <span className="text-[17px] font-medium leading-tight sm:text-[18px] md:text-[20px] transition-transform duration-300 group-hover:-translate-x-1">
                  Direct GuideStar Profile Link
                </span>

                <ArrowRight
                  className="h-8 w-8 translate-x-2 opacity-0 text-[#2ea3f2] transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  strokeWidth={2}
                />
              </Link>
            )}

            {(ein || isPending('ein')) && (
              <p>
                <span className="font-[500] text-[22px]">
                  {isPending('ein') ? `${siteConfig.name} EIN:` : `${siteConfig.name} EIN: ${ein}`}
                </span>
                {isPending('ein') && <PendingNote />}
              </p>
            )}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-6 px-4 sm:px-0">
          <h3 className="text-[28px] text-white">Quick Links</h3>

          <ul className="space-y-2 text-sm" id="lato-font">
            {[
              { name: 'Home', href: '/#hero' },
              { name: 'Mission', href: '/#mission' },
              { name: 'Programs', href: '/#programs' },
              { name: 'Events', href: '/#events' },
              { name: 'Donate', href: '/#donate' },
              { name: 'Volunteer', href: '/#volunteer' },
              { name: 'FAQ', href: '/#faq' },
              { name: 'Team', href: '/#team' },
              {
                name: 'Supported Charity Login',
                href: siteConfig.supportedBy.hubUrl,
              },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  className="hover:text-[#F58C23] hover:tracking-widest transition-all text-[16px] font-[500]"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="space-y-3">
            <h4 className="text-[28px] text-white">{siteConfig.name} Policy</h4>
            <ul className="space-y-1 text-sm" id="lato-font">
              {[
                {
                  name: 'Free For Charity Donation Policy',
                  href: '/free-for-charity-donation-policy',
                },
                {
                  name: 'Donation Policy',
                  href: '/donation-policy',
                },
                {
                  name: `${siteConfig.name} Privacy Policy`,
                  href: '/privacy-policy',
                },
                {
                  name: `${siteConfig.name} Cookie Policy`,
                  href: '/cookie-policy',
                },
                {
                  name: `${siteConfig.name} Terms of Service`,
                  href: '/terms-of-service',
                },
                {
                  name: `${siteConfig.name} Vulnerability Disclosure Policy`,
                  href: '/vulnerability-disclosure-policy',
                },
                {
                  name: `${siteConfig.name} Security Acknowledgement`,
                  href: '/security-acknowledgements',
                },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-[#F58C23] hover:tracking-widest transition-all text-[16px] font-[500]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Column 3: Contact Us */}
        <div className="space-y-6 px-4 sm:px-0">
          <h3 className="text-[28px] text-white">Contact Us</h3>

          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <Mail className="w-10 h-10 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-[500] text-[22px]">E-mail</p>
                {isPending('email') || !email ? (
                  <PendingNote />
                ) : (
                  <a
                    href={`mailto:${email}`}
                    className="font-[500] text-[15px] hover:text-cyan-400 transition-colors break-all"
                    id="aria-font"
                  >
                    {email}
                  </a>
                )}
              </div>
            </div>

            {isPending('phone') && (
              <div className="flex items-start gap-3">
                <Phone className="w-10 h-10 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-[500] text-[22px]">Call Us Today</p>
                  <PendingNote />
                </div>
              </div>
            )}
            {phone && (
              <div className="flex items-start gap-3">
                <Phone className="w-10 h-10 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-[500] text-[22px]">Call Us Today</p>
                  <a
                    href={`tel:${phone.tel}`}
                    className="font-[500] text-[16px] hover:text-cyan-400 transition-colors"
                    id="aria-font"
                  >
                    {phone.display}
                  </a>
                </div>
              </div>
            )}

            {isPending('address') && (
              <div className="flex items-start gap-3">
                <MapPin className="w-10 h-10 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-[500] text-[22px]">Address</p>
                  <PendingNote />
                </div>
              </div>
            )}
            {siteConfig.addresses.map((address) => (
              <a
                key={address.label}
                href={address.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${address.label} in Google Maps`}
                className="flex items-start gap-3 hover:opacity-80 transition-opacity"
              >
                <MapPin className="w-10 h-10 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-[500] text-[22px]">{address.label}</p>
                  <p className="font-[500] text-[16px]" id="aria-font">
                    {address.lines.map((line, i) => (
                      <React.Fragment key={i}>
                        {i > 0 && <br />}
                        {line}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </a>
            ))}

            {isPending('social') && (
              <div className="pt-4">
                <p className="font-[500] text-[22px]">Social Media</p>
                <PendingNote />
              </div>
            )}
            <div className="flex gap-3 pt-4">
              {socialLinks.map(({ href, label }) => {
                const Icon = socialIconByLabel[label] ?? Link2
                return (
                  <a
                    key={`${label}-${href}`}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="bg-orange-500 p-2 rounded-full hover:bg-orange-600 transition-colors"
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="mt-12 py-6 px-4 border-t border-gray-800 text-center text-[18px] font-[500] w-full"
        id="aria-font"
      >
        <p>
          © {currentYear} All Rights Are Reserved by {siteConfig.name}
          {taxStatusLabel ? ` ${taxStatusLabel}` : ''}
          {/* FFC footer standard: the permanent "Supported by" attribution. */}
          {' | Supported by '}
          <Link
            href={siteConfig.supportedBy.url}
            className="underline text-[#2EA3F2] hover:text-[#2EA3F2] transition-colors"
          >
            {siteConfig.supportedBy.name}
          </Link>
        </p>
      </div>
    </footer>
  )
}

export default Footer
