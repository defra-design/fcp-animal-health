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
//                 example 'Authorisation workflow'. Designs with a project
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
    title: 'Agreement details (current)',
    description: 'Baseline of the backoffice agreement details screen, the starting point for authorisation workflow designs.',
    version: '1.0',
    lastUpdated: '2026-11-18',
    project: 'Authorisation workflow',
    url: '/prototypes/back-office/authorisation-workflow/agreement-details'
  },
  {
    type: 'Screen',
    title: 'Claim details (current)',
    description: 'Baseline of the backoffice claim details screen, where a caseworker checks a claim and recommends to pay or reject.',
    version: '1.0',
    lastUpdated: '2026-11-18',
    project: 'Authorisation workflow',
    url: '/prototypes/back-office/authorisation-workflow/claim-details'
  },
  {
    type: 'Screen',
    title: 'Claim withdrawn (current)',
    description: 'Baseline of the admin confirmation screen shown after a claim is withdrawn, with the reason and how the issue was found.',
    version: '1.0',
    lastUpdated: '2026-11-18',
    project: 'Authorisation workflow',
    url: '/prototypes/back-office/authorisation-workflow/claim-withdrawn'
  },
  {
    type: 'Screen',
    title: 'Change log (current)',
    description: 'Baseline of the admin change log, where caseworkers filter changes to agreements and claims by type and status and open one to review.',
    version: '1.0',
    lastUpdated: '2026-11-18',
    project: 'Authorisation workflow',
    url: '/prototypes/back-office/authorisation-workflow/change-log'
  },
  {
    type: 'Screen',
    title: 'Claims (current)',
    description: 'Copy of the claims list in the poultry back office prototype: search, advanced search filters and a table of claims with status.',
    version: '1.0',
    lastUpdated: '2026-11-19',
    project: 'Authorisation workflow',
    url: '/prototypes/back-office/authorisation-workflow/claims'
  },
  {
    type: 'Screen',
    title: 'Agreements (current)',
    description: 'Copy of the agreements list in the poultry back office prototype: search, advanced search filters and a table of agreements.',
    version: '1.0',
    lastUpdated: '2026-11-19',
    project: 'Authorisation workflow',
    url: '/prototypes/back-office/authorisation-workflow/agreements'
  },
  {
    type: 'Screen',
    title: 'Flags (current)',
    description: 'Copy of the flags list in the poultry back office prototype: flags on agreements, with who created them and when.',
    version: '1.0',
    lastUpdated: '2026-11-19',
    project: 'Authorisation workflow',
    url: '/prototypes/back-office/authorisation-workflow/flags'
  },
  {
    type: 'Screen',
    title: 'Claims',
    description: 'Draft copy of the claims list: search, filters and a table of claims with status. Claim numbers link to the draft claim details.',
    version: '1.0',
    lastUpdated: '2026-11-19',
    project: 'Authorisation workflow',
    stage: 'Draft',
    section: 'Claims',
    url: '/prototypes/back-office/authorisation-workflow/draft/claims'
  },
  {
    type: 'Screen',
    title: 'Claim details',
    description: 'Replaces tabs with sections and a contents list, shows status and a banner at the top, links to the agreement, and shows actions by status. Claim history shows the date and time of each event, who did it and the role they had at the time. Details this service can change have a Change link, and users can add notes. Shows a withdrawal request waiting for team lead approval, or rejected.',
    version: '1.4',
    lastUpdated: '2026-11-20',
    project: 'Authorisation workflow',
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
    project: 'Authorisation workflow',
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
    project: 'Authorisation workflow',
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
    project: 'Authorisation workflow',
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
    project: 'Authorisation workflow',
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
    project: 'Authorisation workflow',
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
    project: 'Authorisation workflow',
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
    project: 'Authorisation workflow',
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
    project: 'Authorisation workflow',
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
    project: 'Authorisation workflow',
    stage: 'Draft',
    section: 'Claims',
    url: '/prototypes/back-office/authorisation-workflow/draft/add-note'
  },
  {
    type: 'Screen',
    title: 'Agreements',
    description: 'Draft copy of the agreements list: search, filters and a table of agreements. Agreement numbers link to the draft agreement details.',
    version: '1.0',
    lastUpdated: '2026-11-19',
    project: 'Authorisation workflow',
    stage: 'Draft',
    section: 'Agreements',
    url: '/prototypes/back-office/authorisation-workflow/draft/agreements'
  },
  {
    type: 'Screen',
    title: 'Agreement details',
    description: 'Adds a table of claims for the agreement, with claim type, dates and status, linking to each claim.',
    version: '1.0',
    lastUpdated: '2026-11-18',
    project: 'Authorisation workflow',
    stage: 'Draft',
    section: 'Agreements',
    url: '/prototypes/back-office/authorisation-workflow/draft/agreement-details'
  },
  {
    type: 'Screen',
    title: 'Flags',
    description: 'Draft copy of the flags list: flags on agreements, with who created them and when. Agreement numbers link to the draft agreement details.',
    version: '1.0',
    lastUpdated: '2026-11-19',
    project: 'Authorisation workflow',
    stage: 'Draft',
    section: 'Flags',
    url: '/prototypes/back-office/authorisation-workflow/draft/flags'
  },
  {
    type: 'Screen',
    title: 'Change log',
    description: 'What has changed across claims and agreements, and what is waiting for approval: one row per change, with who made it and their role, and filters by record, type of change, scheme, status and person.',
    version: '2.1',
    lastUpdated: '2026-11-20',
    project: 'Authorisation workflow',
    stage: 'Draft',
    section: 'Change log',
    url: '/prototypes/back-office/authorisation-workflow/draft/change-log'
  },
  {
    type: 'Screen',
    title: 'Review a change',
    description: 'Where a team lead approves or rejects a change or a claim withdrawal request waiting for approval. Rejecting needs notes, approving does not. The decision shows in the change log and the claim history.',
    version: '1.1',
    lastUpdated: '2026-11-20',
    project: 'Authorisation workflow',
    stage: 'Draft',
    section: 'Change log',
    url: '/prototypes/back-office/authorisation-workflow/draft/review-change'
  },
  {
    type: 'Screen',
    title: 'Users',
    description: 'New page for super admins listing everyone in Defra and the RPA with access to the service, with their role, status, date added and when they were last active.',
    version: '1.0',
    lastUpdated: '2026-11-19',
    project: 'Authorisation workflow',
    stage: 'Draft',
    section: 'Users',
    url: '/prototypes/back-office/authorisation-workflow/draft/users'
  },
  {
    type: 'Screen',
    title: 'User',
    description: 'New page for one internal user: their details and role history, so the role shown against a claim history event can be checked for that date.',
    version: '1.0',
    lastUpdated: '2026-11-19',
    project: 'Authorisation workflow',
    stage: 'Draft',
    section: 'Users',
    url: '/prototypes/back-office/authorisation-workflow/draft/user'
  },
  {
    type: 'Reference',
    title: 'Personas',
    description: 'Personas and candidate images, for design discussion.',
    version: '1.0',
    lastUpdated: '2026-11-19',
    project: 'Personas',
    url: '/prototypes/back-office/personas/'
  }
]
