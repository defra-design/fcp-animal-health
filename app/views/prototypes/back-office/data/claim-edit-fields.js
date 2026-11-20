//
// Claim details a back office user can change, for the draft claim pages in
// app/views/prototypes/back-office/authorisation-workflow/draft/.
//
// These are the claim fields in the backlog. Every other claim detail has
// no change link.
//
// Each field has:
//   id            - used in form field names and the session
//   label         - the row name on the claim, also used in the history
//   name          - the label as it reads mid-sentence, for example in
//                   hidden "Change" link text. Keeps acronyms in capitals.
//   value         - the value the farmer submitted
//   type          - 'text', 'date' (YYYY-MM-DD) or 'radios'
//   options       - radios only: the choices
//   page          - the edit page in draft/claim-edit/. Fields that are
//                   changed together share a page.
//   needsApproval - true if a change needs team lead approval. Illustrative:
//                   to confirm with the BA. A batch of changes needs approval
//                   if any change in it does.
//

module.exports = [
  { id: 'dateOfVisit', label: 'Date of visit', name: 'date of visit', value: '2025-12-10', type: 'date', page: 'date-of-visit', needsApproval: true },
  { id: 'herdCph', label: 'Herd CPH', name: 'herd CPH', value: '12/254/1212', type: 'text', page: 'herd-cph', needsApproval: false },
  { id: 'vetName', label: 'Vet’s name', name: 'vet’s name', value: 'Jo', type: 'text', page: 'vet', needsApproval: false },
  { id: 'vetRcvs', label: 'Vet’s RCVS number', name: 'vet’s RCVS number', value: '4224422', type: 'text', page: 'vet', needsApproval: false },
  { id: 'urn', label: 'URN or test certificate', name: 'URN or test certificate', value: 'VET9914224', type: 'text', page: 'urn', needsApproval: false },
  { id: 'testResult', label: 'Follow-up test result', name: 'follow-up test result', value: 'Positive', type: 'radios', options: ['Positive', 'Negative'], page: 'test-result', needsApproval: true }
]
