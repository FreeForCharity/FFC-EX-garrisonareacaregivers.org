// Team member data
// This file imports team member data from JSON files in ./team/ directory
// To edit team members, edit the JSON files directly in src/data/team/
//
// Garrison Area Caregivers' 2026 Board of Directors, as published on the
// charity's About Us page (site/about.html). Names and offices only — the
// board members' personal emails and phone numbers are not repeated here.

import joelLimoges from './team/joel-limoges.json'
import timDejonghe from './team/tim-dejonghe.json'
import susieIlstrup from './team/susie-ilstrup.json'
import danNelson from './team/dan-nelson.json'
import herbScattarelli from './team/herb-scattarelli.json'

export type TeamMember = { name: string; title: string }

export const team: TeamMember[] = [
  joelLimoges,
  timDejonghe,
  susieIlstrup,
  danNelson,
  herbScattarelli,
]
