import React from 'react'
import { render, screen } from '@testing-library/react'
import Team from '../../../src/components/home-page/TheFreeForCharityTeam'
import { team } from '../../../src/data/team'
import { siteConfig } from '../../../src/lib/site.config'

describe('TheFreeForCharityTeam', () => {
  it('renders the section heading', () => {
    render(<Team />)
    expect(
      screen.getByRole('heading', { name: `The ${siteConfig.name} Board` })
    ).toBeInTheDocument()
  })

  it("lists the charity's own board, not the template's sample team", () => {
    render(<Team />)
    for (const member of team) expect(screen.getByText(member.name)).toBeInTheDocument()
    expect(screen.queryByText(/Clarke Moyer|Free For Charity/)).not.toBeInTheDocument()
  })

  it('mounts under the #team section landmark id', () => {
    const { container } = render(<Team />)
    expect(container.querySelector('#team')).not.toBeNull()
  })
})
