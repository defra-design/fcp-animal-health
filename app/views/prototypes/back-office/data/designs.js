//
// Designs listed on the index page.
//
// Add one entry per design, with its page in app/views/prototypes/back-office/.
// Each entry needs:
//   type        - 'Screen' or 'Email'
//   title       - short name of the design
//   description - one sentence on what it is and when it is used
//   version     - bump it when the design changes, for example '1.1'
//   lastUpdated - date of the last change, as YYYY-MM-DD
//   project     - optional, the project folder the design belongs to, for
//                 example 'Back office 2.0 optimisation'. Designs with a project
//                 are also listed on that project's index page.
//   stage       - optional, 'Draft' for a draft redesign. Drafts are listed
//                 in their own table on the project index page.
//   section     - optional, drafts only: the navigation section the page
//                 belongs to, for example 'Claims'. If the project index
//                 sets siteMapSections, drafts are listed as a site map,
//                 grouped by section, in the order they appear here.
//   url         - path to the design page
//

module.exports = [
  {
    type: 'Screen',
    title: 'Claims',
    description: 'Claims list with search and filters. The Flags column, next to the SBI, shows if the claim is flagged and if its agreement (the customer) is flagged, and the Flag filter can show either.',
    version: '2.0',
    lastUpdated: '2026-11-20',
    project: 'Back office 2.0 optimisation',
    stage: 'Draft',
    section: 'Claims',
    url: '/prototypes/back-office/authorisation-workflow/draft/claims'
  },
  {
    type: 'Screen',
    title: 'Claim details',
    description: 'Replaces tabs with sections and a contents list, shows status and a banner at the top, links to the agreement, and shows actions by status. Claim history shows the date and time of each event, who did it and the role they had at the time. Details this service can change have a Change link, and users can add notes. Shows a withdrawal request waiting for team lead approval, or rejected.',
    version: '1.5',
    lastUpdated: '2026-11-20',
    project: 'Back office 2.0 optimisation',
    stage: 'Draft',
    section: 'Claims',
    url: '/prototypes/back-office/authorisation-workflow/draft/claim-details'
  },
  {
    type: 'Screen',
    title: 'Claim withdrawn',
    description: 'Replaces the separate claim withdrawn page with the claim details page in a withdrawn state, once a team lead approves the request: a banner says when, who requested and approved it, why, and that the farmer can no longer see the claim.',
    version: '1.1',
    lastUpdated: '2026-11-20',
    project: 'Back office 2.0 optimisation',
    stage: 'Draft',
    section: 'Claims',
    url: '/prototypes/back-office/authorisation-workflow/draft/claim-withdrawn'
  },
  {
    type: 'Screen',
    title: 'Withdraw claim',
    description: 'Form a back office user fills in to request a claim withdrawal, sent to a team lead for approval. Based on the live fields: reason, how the issue was discovered and details, with added Other options. Shows the agreement holder, and asks who made contact when the customer contacted the RPA.',
    version: '3.0',
    lastUpdated: '2026-11-20',
    project: 'Back office 2.0 optimisation',
    stage: 'Draft',
    section: 'Claims',
    url: '/prototypes/back-office/authorisation-workflow/draft/withdraw-claim'
  },
  {
    type: 'Screen',
    title: 'Check your changes',
    description: 'Check answers page for changing claim details. The user changes one or more details, then saves them at once, or sends them for team lead approval, as one entry in the claim history.',
    version: '1.0',
    lastUpdated: '2026-11-19',
    project: 'Back office 2.0 optimisation',
    stage: 'Draft',
    section: 'Claims',
    url: '/prototypes/back-office/authorisation-workflow/draft/claim-edit/check'
  },
  {
    type: 'Screen',
    title: 'Change the vet’s details',
    description: 'Edit page for the vet’s name and RCVS number, changed together. Continue goes to check your changes.',
    version: '1.0',
    lastUpdated: '2026-11-19',
    project: 'Back office 2.0 optimisation',
    stage: 'Draft',
    section: 'Claims',
    url: '/prototypes/back-office/authorisation-workflow/draft/claim-edit/vet'
  },
  {
    type: 'Screen',
    title: 'Change the follow-up test result',
    description: 'Edit page for the test result. Warns that a change needs team lead approval.',
    version: '1.0',
    lastUpdated: '2026-11-19',
    project: 'Back office 2.0 optimisation',
    stage: 'Draft',
    section: 'Claims',
    url: '/prototypes/back-office/authorisation-workflow/draft/claim-edit/test-result'
  },
  {
    type: 'Screen',
    title: 'Change the date of visit',
    description: 'Edit page for the date of the vet’s visit. Warns that a change needs team lead approval.',
    version: '1.0',
    lastUpdated: '2026-11-19',
    project: 'Back office 2.0 optimisation',
    stage: 'Draft',
    section: 'Claims',
    url: '/prototypes/back-office/authorisation-workflow/draft/claim-edit/date-of-visit'
  },
  {
    type: 'Screen',
    title: 'Change the herd CPH',
    description: 'Edit page for the herd’s county parish holding number.',
    version: '1.0',
    lastUpdated: '2026-11-19',
    project: 'Back office 2.0 optimisation',
    stage: 'Draft',
    section: 'Claims',
    url: '/prototypes/back-office/authorisation-workflow/draft/claim-edit/herd-cph'
  },
  {
    type: 'Screen',
    title: 'Change the URN or test certificate',
    description: 'Edit page for the unique lab reference number or test certificate reference.',
    version: '1.0',
    lastUpdated: '2026-11-19',
    project: 'Back office 2.0 optimisation',
    stage: 'Draft',
    section: 'Claims',
    url: '/prototypes/back-office/authorisation-workflow/draft/claim-edit/urn'
  },
  {
    type: 'Screen',
    title: 'Add a note',
    description: 'Lets a back office user add a note to a claim. The note shows in the claim history with who added it and their role, and cannot be changed or deleted.',
    version: '1.0',
    lastUpdated: '2026-11-19',
    project: 'Back office 2.0 optimisation',
    stage: 'Draft',
    section: 'Claims',
    url: '/prototypes/back-office/authorisation-workflow/draft/add-note'
  },
  {
    type: 'Screen',
    title: 'Agreements',
    description: 'Agreements list with search and filters. The Flags column shows if the agreement is flagged and how many of its claims are flagged, and the Flag filter can show either.',
    version: '2.0',
    lastUpdated: '2026-11-20',
    project: 'Back office 2.0 optimisation',
    stage: 'Draft',
    section: 'Agreements',
    url: '/prototypes/back-office/authorisation-workflow/draft/agreements'
  },
  {
    type: 'Screen',
    title: 'Agreement details',
    description: 'Leads with the agreement number, lists the agreement’s claims, and shows flags on the agreement and its claims in a banner. Anyone can flag the agreement.',
    version: '1.1',
    lastUpdated: '2026-11-20',
    project: 'Back office 2.0 optimisation',
    stage: 'Draft',
    section: 'Agreements',
    url: '/prototypes/back-office/authorisation-workflow/draft/agreement-details'
  },
  {
    type: 'Screen',
    title: 'Flags',
    description: 'Every flag on agreements and claims, with why, who flagged it and their role, and filters. Flags are created and removed on the agreement or claim, not here.',
    version: '2.2',
    lastUpdated: '2026-11-20',
    project: 'Back office 2.0 optimisation',
    stage: 'Draft',
    section: 'Flags',
    url: '/prototypes/back-office/authorisation-workflow/draft/flags'
  },
  {
    type: 'Screen',
    title: 'Flag a claim or agreement',
    description: 'Opened from the claim or agreement. Asks why it is being flagged, from a short list of types, with an optional note, needed for Other.',
    version: '1.0',
    lastUpdated: '2026-11-20',
    project: 'Back office 2.0 optimisation',
    stage: 'Draft',
    section: 'Flags',
    url: '/prototypes/back-office/authorisation-workflow/draft/flag'
  },
  {
    type: 'Screen',
    title: 'Remove a flag',
    description: 'The person who created a flag, or a team lead, removes it and says why. Others see who can remove it.',
    version: '1.0',
    lastUpdated: '2026-11-20',
    project: 'Back office 2.0 optimisation',
    stage: 'Draft',
    section: 'Flags',
    url: '/prototypes/back-office/authorisation-workflow/draft/remove-flag'
  },
  {
    type: 'Screen',
    title: 'Change log',
    description: 'What has changed across claims and agreements, and what is waiting for approval: one row per change, with who made it and their role, and filters by record, type of change, scheme, status and person.',
    version: '2.3',
    lastUpdated: '2026-11-20',
    project: 'Back office 2.0 optimisation',
    stage: 'Draft',
    section: 'Change log',
    url: '/prototypes/back-office/authorisation-workflow/draft/change-log'
  },
  {
    type: 'Screen',
    title: 'Review a change',
    description: 'Where a team lead approves or rejects a change or a claim withdrawal request waiting for approval. Rejecting needs notes, approving does not. The decision shows in the change log and the claim history.',
    version: '1.2',
    lastUpdated: '2026-11-20',
    project: 'Back office 2.0 optimisation',
    stage: 'Draft',
    section: 'Change log',
    url: '/prototypes/back-office/authorisation-workflow/draft/review-change'
  },
  {
    type: 'Screen',
    title: 'Users',
    description: 'New page for team leads listing everyone in Defra and the RPA with access to the service, with their role, status, date added and when they were last active.',
    version: '1.1',
    lastUpdated: '2026-11-20',
    project: 'Back office 2.0 optimisation',
    stage: 'Draft',
    section: 'Users',
    url: '/prototypes/back-office/authorisation-workflow/draft/users'
  },
  {
    type: 'Screen',
    title: 'User',
    description: 'New page for one internal user: their details and role history, so the role shown against a claim history event can be checked for that date.',
    version: '1.1',
    lastUpdated: '2026-11-20',
    project: 'Back office 2.0 optimisation',
    stage: 'Draft',
    section: 'Users',
    url: '/prototypes/back-office/authorisation-workflow/draft/user'
  },
  {
    type: 'Email',
    title: 'Daily email to team leads',
    description: 'Sent each weekday morning when changes are waiting for approval: how many, how many in the last 24 hours, and links to the filtered change log.',
    version: '1.0',
    lastUpdated: '2026-11-20',
    project: 'Back office 2.0 optimisation',
    stage: 'Draft',
    section: 'Emails',
    url: '/prototypes/back-office/authorisation-workflow/draft/emails/team-lead-daily'
  },
  {
    type: 'Email',
    title: 'Request rejected',
    description: 'Sent to the person who asked for a change or withdrawal when a team lead rejects it, with the team lead’s reason and what to do next.',
    version: '1.0',
    lastUpdated: '2026-11-20',
    project: 'Back office 2.0 optimisation',
    stage: 'Draft',
    section: 'Emails',
    url: '/prototypes/back-office/authorisation-workflow/draft/emails/request-rejected'
  },
  {
    type: 'Email',
    title: 'Claim withdrawn (to the farmer)',
    description: 'Sent to the agreement holder when a withdrawal is approved, as the claim disappears from their account: which claim, when, why, and how to contact the RPA.',
    version: '1.0',
    lastUpdated: '2026-11-20',
    project: 'Back office 2.0 optimisation',
    stage: 'Draft',
    section: 'Emails',
    url: '/prototypes/back-office/authorisation-workflow/draft/emails/claim-withdrawn-farmer'
  },
  {
    type: 'Screen',
    title: 'Claim details',
    description: 'The claim details page as in the live service today: agreement details at the top, then the claim and its history in tabs. Change links open a page of their own, and changes waiting for approval show the current and proposed values. The history shows each request and decision, with who and their role.',
    version: '1.0',
    lastUpdated: '2026-11-26',
    project: 'Back office 1.0 optimisation',
    url: '/prototypes/back-office/v1-optimisation/claim-details'
  },
  {
    type: 'Screen',
    title: 'Update a claim detail',
    description: 'A page of its own for changing the date of visit, vet’s name, vet’s RCVS number or test result, showing the current value, with a note saying why, instead of a form in the middle of the claim. Every change is sent to a team lead for approval, and replaces any change still waiting.',
    version: '1.0',
    lastUpdated: '2026-11-26',
    project: 'Back office 1.0 optimisation',
    url: '/prototypes/back-office/v1-optimisation/change/date-of-visit'
  },
  {
    type: 'Screen',
    title: 'Review a change',
    description: 'Where a team lead approves or rejects a change a case officer asked for: the current and proposed values, who asked, when and their note. Rejecting needs a reason.',
    version: '1.0',
    lastUpdated: '2026-11-26',
    project: 'Back office 1.0 optimisation',
    url: '/prototypes/back-office/v1-optimisation/review'
  },
  {
    type: 'Reference',
    title: 'Personas',
    description: 'Personas, the 2 types of back office user and what each can do, for design discussion.',
    version: '2.0',
    lastUpdated: '2026-11-20',
    project: 'Personas',
    url: '/prototypes/back-office/personas/'
  }
]
