import React from 'react'
import { team } from '@/data/team'
import { siteConfig } from '@/lib/site.config'

// The charity's leadership, from src/data/team/*.json (aggregated in
// src/data/team.ts). No photos are published, so each member is a name and
// office rather than a photo card.
const index = () => {
  if (team.length === 0) return null
  return (
    <div id="team" className="py-[50px]">
      <h1
        className="font-[400] text-[40px] lg:text-[48px]  tracking-[0] text-center mx-auto mb-[50px]"
        id="faustina-font"
      >
        The {siteConfig.name} Board
      </h1>

      <ul className="w-[90%] mx-auto py-[40px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] text-center">
        {team.map((member) => (
          <li key={member.name}>
            <h3 className="text-[32px] font-[400]" id="lato-font">
              {member.name}
            </h3>
            <p className="text-[25px] font-[400]" id="lato-font">
              {member.title}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default index
