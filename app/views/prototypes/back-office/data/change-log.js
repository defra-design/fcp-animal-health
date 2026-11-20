//
// Change log entries for the draft change log page
// (app/views/prototypes/back-office/authorisation-workflow/draft/change-log.html).
//
// One entry per change. A change can cover several details saved at once.
// When a team lead approves or rejects a change, the same entry's approval
// is updated: approvals are not entries of their own.
//
// Changes made in the prototype, through the change claim details flow, are
// added to these by app/routes.js, in the same shape. Team lead decisions
// made in the prototype (draft/review-change) are applied on top.
//
// Each entry has:
//   id          - unique, used in the review page address
//   date        - YYYY-MM-DD
//   record      - what was changed:
//                   kind       - 'claim' or 'agreement'
//                   number     - the claim or agreement number
//                   claimType  - claims only: 'Review' or 'Follow-up'
//   scheme      - 'IAHW' or 'PBR'
//   types       - the types of change, from changeTypes below. A change
//                 covering several details has several types.
//   summary     - what the Change column says
//   fields      - optional: the details changed, listed when there is more
//                 than one
//   changes     - optional: each detail changed, as { label, from, to },
//                 shown to the team lead reviewing the change
//   reason      - optional: why the change was made
//   by          - who made it: a persona key from app/views/prototypes/back-office/data/personas.js, or
//                 text such as 'Assisted Digital'
//   approval    - 'pending', 'approved', 'rejected', or 'none' if the change
//                 did not need approval
//   decidedBy   - approved or rejected only: persona key of who decided
//   decidedDate - approved or rejected only: YYYY-MM-DD
//   decisionNotes - optional: the team lead's notes. Required when rejected.
//   page        - the draft page the record number links to, for example
//                 'claim-details'. Every claim links to the one draft claim
//                 page, and every agreement to the one draft agreement page.
//
// The data is illustrative. It covers claims and agreements, both schemes,
// every approval status and several people, including Sanjay Mehta before
// and after his role changed on 3 November 2026.
//

// Types of change, grouped by what was changed. The change log's "Type of
// change" filter is built from these. Claim detail changes use the field
// labels in app/views/prototypes/back-office/data/claim-edit-fields.js, as "<label> changed".
const changeTypes = {
  claim: [
    'Date of visit changed',
    'Herd CPH changed',
    'Vet’s name changed',
    'Vet’s RCVS number changed',
    'URN or test certificate changed',
    'Follow-up test result changed',
    'Claim withdrawn',
    'New claim via Assisted Digital'
  ],
  agreement: [
    'New agreement via Assisted Digital',
    'Flag created',
    'Flag deleted'
  ]
}

const entries = [
  {
    id: 'example-1',
    date: '2026-11-17',
    record: { kind: 'agreement', number: 'IAHW-NQG3-7WZY' },
    scheme: 'IAHW',
    types: ['Flag created'],
    summary: 'Flag created',
    changes: [{ label: 'Flag', from: 'Not flagged', to: 'Flagged' }],
    reason: 'The agreement holder has 2 claims for the same herd with the same date of visit. Flag the agreement while we check them.',
    by: 'backOfficeAdministrator',
    approval: 'pending',
    page: 'agreement-details'
  },
  {
    id: 'example-2',
    date: '2026-11-14',
    record: { kind: 'claim', number: 'REBC-F775-GVVX', claimType: 'Review' },
    scheme: 'IAHW',
    types: ['Vet’s name changed', 'Vet’s RCVS number changed'],
    summary: '2 claim details changed',
    fields: ['Vet’s name', 'Vet’s RCVS number'],
    by: 'backOfficeApprover',
    approval: 'none',
    page: 'claim-details'
  },
  {
    id: 'example-3',
    date: '2026-11-11',
    record: { kind: 'claim', number: 'REBC-F775-GVVX', claimType: 'Review' },
    scheme: 'IAHW',
    types: ['Claim withdrawn'],
    summary: 'Claim withdrawn',
    by: 'backOfficeAdministrator',
    approval: 'approved',
    decidedBy: 'backOfficeLead',
    decidedDate: '2026-11-12',
    page: 'claim-withdrawn'
  },
  {
    id: 'example-4',
    date: '2026-11-06',
    record: { kind: 'agreement', number: 'PBR-4TQM-2HXA' },
    scheme: 'PBR',
    types: ['New agreement via Assisted Digital'],
    summary: 'New agreement via Assisted Digital',
    by: 'Assisted Digital',
    approval: 'approved',
    decidedBy: 'backOfficeLead',
    decidedDate: '2026-11-07',
    page: 'agreement-details'
  },
  {
    id: 'example-5',
    date: '2026-10-31',
    record: { kind: 'claim', number: 'PORE-F775-GVVX', claimType: 'Review' },
    scheme: 'PBR',
    types: ['URN or test certificate changed'],
    summary: 'URN or test certificate changed',
    by: 'backOfficeAdministrator',
    approval: 'none',
    page: 'claim-details'
  },
  {
    id: 'example-6',
    date: '2026-10-28',
    record: { kind: 'claim', number: 'REBC-F775-GVVX', claimType: 'Review' },
    scheme: 'IAHW',
    types: ['Date of visit changed'],
    summary: 'Date of visit changed',
    by: 'backOfficeAdministrator',
    approval: 'rejected',
    decidedBy: 'backOfficeLead',
    decidedDate: '2026-10-29',
    decisionNotes: 'The new date is before the agreement started, so the claim would not be eligible. Check the date with the vet.',
    page: 'claim-details'
  },
  {
    id: 'example-7',
    date: '2026-10-21',
    record: { kind: 'agreement', number: 'IAHW-8LKQ-V9EL' },
    scheme: 'IAHW',
    types: ['Flag deleted'],
    summary: 'Flag deleted',
    by: 'backOfficeEditor',
    approval: 'approved',
    decidedBy: 'backOfficeLead',
    decidedDate: '2026-10-21',
    page: 'agreement-details'
  },
  {
    id: 'example-8',
    date: '2026-10-15',
    record: { kind: 'claim', number: 'PORE-F775-GVVX', claimType: 'Review' },
    scheme: 'PBR',
    types: ['New claim via Assisted Digital'],
    summary: 'New claim via Assisted Digital',
    by: 'Assisted Digital',
    approval: 'approved',
    decidedBy: 'backOfficeApprover',
    decidedDate: '2026-10-16',
    page: 'claim-details'
  }
]

module.exports = { changeTypes, entries }
