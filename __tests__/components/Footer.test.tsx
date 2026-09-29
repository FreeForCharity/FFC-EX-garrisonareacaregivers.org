import React from 'react'
import { render, screen, within } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import Footer from '../../src/components/footer'
import { isPending, PENDING_TEXT, siteConfig } from '../../src/lib/site.config'

// Extend Jest matchers
expect.extend(toHaveNoViolations)

describe('Footer component', () => {
  it('should render the footer', () => {
    render(<Footer />)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('should display Endorsements section', () => {
    render(<Footer />)
    expect(screen.getByText('Endorsements')).toBeInTheDocument()
  })

  it('should display Quick Links section', () => {
    render(<Footer />)
    expect(screen.getByText('Quick Links')).toBeInTheDocument()
  })

  it('should display Contact Us section with contact information', () => {
    render(<Footer />)
    expect(screen.getByText('Contact Us')).toBeInTheDocument()
  })

  it('should have social media links', () => {
    render(<Footer />)
    // Check for social media links by their aria-labels or visible text
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })

  it('should display the current year in copyright', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument()
  })

  it('should have GuideStar profile link', () => {
    render(<Footer />)
    const guidestarLink = screen.getByText(/GuideStar Profile/i)
    expect(guidestarLink).toBeInTheDocument()
  })

  it('links the contact email, or shows the placeholder while it is pending', () => {
    render(<Footer />)
    const links = screen.getAllByRole('link')
    const emailLink = links.find((link) => link.getAttribute('href')?.includes('mailto:'))
    if (isPending('email')) {
      expect(emailLink).toBeUndefined()
      const slot = screen.getByText('E-mail').parentElement as HTMLElement
      expect(slot).toHaveTextContent(PENDING_TEXT)
      expect(within(slot).getByText(PENDING_TEXT).closest('a')).toBeNull()
    } else {
      expect(emailLink).toHaveAttribute('href', `mailto:${siteConfig.contactEmail}`)
    }
  })

  it("renders the charity's own EIN, phone, address and Candid profile — never FFC's", () => {
    const { container } = render(<Footer />)
    expect(screen.getByText(`${siteConfig.name} EIN: ${siteConfig.ein}`)).toBeInTheDocument()
    expect(container.querySelector(`a[href="tel:${siteConfig.phone.tel}"]`)).not.toBeNull()
    for (const address of siteConfig.addresses) {
      expect(screen.getByText(address.label)).toBeInTheDocument()
    }
    expect(container.querySelector(`a[href="${siteConfig.guidestar.profileUrl}"]`)).not.toBeNull()
    expect(container.innerHTML).not.toMatch(/46-2471893|5202228104|Raleigh|State College|bbbe173a/)
  })

  it('always renders the permanent "Supported by" attribution', () => {
    render(<Footer />)
    expect(screen.getByText(/All Rights Are Reserved/)).toHaveTextContent(
      `Supported by ${siteConfig.supportedBy.name}`
    )
  })

  it('should not have accessibility violations', async () => {
    const { container } = render(<Footer />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
