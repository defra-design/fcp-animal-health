//
// What we changed
// ===============
//
// The changes listed on app/views/prototypes/back-office/authorisation-workflow/summary.html, a
// short outline of the main UX changes in the draft designs, for showing
// Olayinka (BA) and other stakeholders what is new.
//
// Groups follow the site map on the index. Each group has sections (one per
// page, or one with no title when the group is one page), and each section
// has:
//   designs - links to the draft designs: text and path (from the draft
//             folder, for example '/claim-details')
//   items   - the changes, in plain words, each with:
//               text    - what changed and why it matters. May contain
//                         simple HTML
//               added   - when it was added, YYYY-MM-DD
//               updated - optional: when it last changed in a way that
//                         matters. Do not date minor wording changes
//
// The page tags a change "New" if it was added in the last 2 working days,
// and "Updated" if it is not new but changed in the last 7 days.
//
// Dates before 20 November 2026 are the day the design was last updated
// before the back office moved to this repo, so they are approximate.
//

module.exports = [
  {
    group: 'Across the service',
    sections: [
    {
      title: null,
      designs: [],
      items: [
        { text: 'Built only from GOV.UK Design System components, so it is quick to build and accessible.', added: '2026-11-18' },
        { text: 'Pages lead with the thing the user came for: the claim on a claim page, the agreement on an agreement page.', added: '2026-11-18' },
        { text: 'Every action is recorded in the history: what changed, from what to what, who did it, their role at the time, why, and the date and time.', added: '2026-11-19', updated: '2026-11-20' },
        { text: 'Dates are written in full, or as 5/11/2026 in tables where space is tight.', added: '2026-11-19' },
        { text: '2 types of back office user: case officers, who can request changes, and team leads, who approve or reject them.', added: '2026-11-20' },
        { text: 'Agreements and claims can both be flagged. Flags show wherever the agreement or claim appears.', added: '2026-11-20' }
      ]
    }
  ]
  },
  {
    group: 'Claims',
    sections: [
    {
      title: 'Claims list',
      designs: [
        { text: 'Claims, filtered to claims or agreements flagged', path: '/claims?claimsFlag=either' }
      ],
      items: [
        { text: 'A Flags column next to the SBI shows if the claim is flagged, and if its agreement (the customer) is flagged.', added: '2026-11-20' },
        { text: 'Filter to claims that are flagged, that belong to a flagged agreement, or either.', added: '2026-11-20' }
      ]
    },
    {
      title: 'Claim details',
      designs: [
        { text: 'Claim details', path: '/claim-details' },
        { text: 'Claim details, after flagging the claim and its agreement', path: '/claim-details' }
      ],
      items: [
        { text: 'The claim comes first. The agreement is a short summary alongside, and the full history is below. No tabs.', added: '2026-11-18' },
        { text: 'The claim number is the heading, with its status as a tag. A banner says what the claim needs next.', added: '2026-11-18' },
        { text: 'Action buttons depend on the claim’s status.', added: '2026-11-18' },
        { text: 'Only details this service can change have a "Change" link, so it is clear what can be changed.', added: '2026-11-19' },
        { text: 'The claim history shows who did each thing and their role at the time, with a status column for changes waiting for approval.', added: '2026-11-19' },
        { text: 'If the claim or its agreement is flagged, the banner says so, with a warning, why and who flagged it.', added: '2026-11-20' },
        { text: '"Flag this claim" is with the other actions.', added: '2026-11-20' }
      ]
    },
    {
      title: 'Changing claim details',
      designs: [
        { text: 'Check your changes, after changing the vet’s details and the test result', path: '/claim-edit/check' }
      ],
      items: [
        { text: 'Change several details, check them on one page, then save once. Based on the GOV.UK check answers pattern.', added: '2026-11-19' },
        { text: 'One reason covers all the changes, and they are one entry in the history.', added: '2026-11-19' },
        { text: 'Changes that affect eligibility, such as the test result, go to a team lead for approval first.', added: '2026-11-19' }
      ]
    },
    {
      title: 'Add a note',
      designs: [
        { text: 'Add a note', path: '/add-note' }
      ],
      items: [
        { text: 'Add a note to any claim from the claim history.', added: '2026-11-19' },
        { text: 'Notes cannot be changed or deleted, like the rest of the history.', added: '2026-11-19' }
      ]
    },
    {
      title: 'Withdraw claim',
      designs: [
        { text: 'Withdraw claim', path: '/withdraw-claim' },
        { text: 'Claim details, with a withdrawal request waiting for approval', path: '/claim-details' }
      ],
      items: [
        { text: 'A withdrawal is a request. A team lead approves it before the claim is withdrawn, and the claim stays in check while it waits.', added: '2026-11-20' },
        { text: 'Uses the live fields, with an "Other" option for the reason and how the issue was found.', added: '2026-11-18', updated: '2026-11-19' },
        { text: 'Shows the agreement holder, so the caseworker can check who they are speaking to.', added: '2026-11-19' },
        { text: 'Records who asked for the withdrawal and how they contacted the RPA.', added: '2026-11-19' },
        { text: 'Warns that a withdrawal cannot be undone and the farmer will no longer see the claim.', added: '2026-11-20' }
      ]
    },
    {
      title: 'Claim withdrawn',
      designs: [
        { text: 'Claim withdrawn', path: '/claim-withdrawn' }
      ],
      items: [
        { text: 'No separate page. Once a team lead approves the request, the claim page shows the claim as withdrawn, with a banner saying when, who requested and approved it, and why.', added: '2026-11-18', updated: '2026-11-20' }
      ]
    }
  ]
  },
  {
    group: 'Agreements',
    sections: [
    {
      title: 'Agreements list',
      designs: [
        { text: 'Agreements, filtered to agreements or their claims flagged', path: '/agreements?agreementsFlag=either' }
      ],
      items: [
        { text: 'A Flags column shows if the agreement is flagged, and how many of its claims are flagged.', added: '2026-11-20' },
        { text: 'Filter to agreements that are flagged, that have flagged claims, or either.', added: '2026-11-20' }
      ]
    },
    {
      title: 'Agreement details',
      designs: [
        { text: 'Agreement details', path: '/agreement-details' }
      ],
      items: [
        { text: 'Same heading pattern as the claim page: the agreement number as the heading.', added: '2026-11-18' },
        { text: 'New table of the agreement’s claims, each linking to the claim, showing which are flagged.', added: '2026-11-18', updated: '2026-11-20' },
        { text: 'Address written in sentence case, one line per part.', added: '2026-11-18' },
        { text: 'If the agreement or any of its claims is flagged, a banner says so. "Flag this agreement" is under the details.', added: '2026-11-20' }
      ]
    }
  ]
  },
  {
    group: 'Flags',
    sections: [
    {
      title: 'Flag a claim or agreement (new)',
      designs: [
        { text: 'Flag this claim', path: '/flag?level=claim' }
      ],
      items: [
        { text: 'Flag from the claim or agreement itself, so there is no need to find the agreement first.', added: '2026-11-20' },
        { text: 'Anyone can flag, as it changes nothing for the customer. Say why from a short list, with a note.', added: '2026-11-20' },
        { text: 'The person who created a flag, or a team lead, can remove it, saying why.', added: '2026-11-20' }
      ]
    },
    {
      title: 'Flags list',
      designs: [
        { text: 'Flags', path: '/flags' }
      ],
      items: [
        { text: 'Every flag on agreements and claims, with why, who flagged it and their role.', added: '2026-11-20' },
        { text: 'Filter by what is flagged, who flagged it (me, case officers, team leads) and agreement type.', added: '2026-11-20' },
        { text: 'No create or delete buttons: flags are added and removed on the agreement or claim.', added: '2026-11-20' }
      ]
    }
  ]
  },
  {
    group: 'Change log',
    sections: [
    {
      title: null,
      designs: [
        { text: 'Change log', path: '/change-log' }
      ],
      items: [
        { text: 'One place to see what has changed, on claims and agreements, and what is waiting for approval.', added: '2026-11-18' },
        { text: 'One row per change, showing who made it and their role at the time. When a team lead decides, the same row shows who approved or rejected it.', added: '2026-11-19' },
        { text: 'Says how many changes are waiting for approval, with a link to just those.', added: '2026-11-19' },
        { text: 'Filter by claims or agreements, type of change, scheme (IAHW or PBR), status, who made the change and when (last 24 hours, 7 days or 30 days).', added: '2026-11-18', updated: '2026-11-20' },
        { text: 'Type and Number columns: Claim or Agreement in bold, then the number, linking to it. The flags list is the same.', added: '2026-11-20' }
      ]
    },
    {
      title: 'Review a change',
      designs: [
        { text: 'Review a change, showing the reject notes', path: '/review-change' }
      ],
      items: [
        { text: 'Team leads approve or reject a change from the change log, seeing who made it, why, and each detail from and to.', added: '2026-11-19' },
        { text: 'Requests to withdraw a claim are reviewed the same way, showing the reason, how the issue was found and who asked.', added: '2026-11-20' },
        { text: 'Rejecting needs a reason. Approving can have optional notes. Both are recorded in the history for the person who made the change.', added: '2026-11-19' },
        { text: 'An approved change updates the claim. A rejected one does not.', added: '2026-11-19' },
        { text: 'Team leads cannot approve their own changes.', added: '2026-11-19' }
      ]
    }
  ]
  },
  {
    group: 'Users (new)',
    sections: [
    {
      title: null,
      designs: [
        { text: 'Users', path: '/users' },
        { text: 'User: Helen Marsh, with a role change', path: '/users/helenMarsh' }
      ],
      items: [
        { text: 'Team leads can see everyone with access, their role and when they were last active, to support access reviews.', added: '2026-11-19' },
        { text: 'Each user has a role history, so the role shown in a claim history can be checked for that date.', added: '2026-11-19' },
        { text: 'Names in the claim history link to the user.', added: '2026-11-19' }
      ]
    }
  ]
  },
  {
    group: 'Emails (new)',
    sections: [
    {
      title: null,
      designs: [
        { text: 'Daily email to team leads', path: '/emails/team-lead-daily' },
        { text: 'Request rejected', path: '/emails/request-rejected' },
        { text: 'Claim withdrawn (to the farmer)', path: '/emails/claim-withdrawn-farmer' }
      ],
      items: [
        { text: 'Team leads get a daily email when changes are waiting for approval, with links to the filtered change log. Today nothing tells them.', added: '2026-11-20' },
        { text: 'The person who asked for a change gets an email if it is rejected, with the team lead’s reason.', added: '2026-11-20' },
        { text: 'The farmer gets an email when their claim is withdrawn, as it disappears from their account.', added: '2026-11-20' }
      ]
    }
  ]
  }
]
