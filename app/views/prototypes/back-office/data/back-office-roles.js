//
// Back office user types and role-based access control (RBAC)
// ===========================================================
//
// The single point of reference for who can do what in the back office.
// Shown on the personas page, and used by the "Who can change what" design
// note. Available in every back office view as `backOfficeRoles`.
//
// Olayinka (BA) confirmed on 20 November 2026 that there are only 2 types
// of back office user:
// - case officer: has the RPA's Recommender, Processor and User roles
// - team lead: has the RPA's Super admin role, and approves or rejects
//   what case officers request
//
// rbacRoles and live come from the RPA's roles table, shared with the team.
// caseOfficer and teamLead are what each type can do once the
// authorisation workflow is in place. Where they go beyond the RPA's table
// they are our inference or proposal, marked in `note`, to agree with the
// RPA.
//
// Each permission has:
//   action      - what the user can do
//   live        - for each of rbacRoles, in order, true if that role can
//                 do it today
//   caseOfficer - what a case officer can do: 'Yes', 'No', or 'Request'
//                 (they can ask, and a team lead approves or rejects)
//   teamLead    - what a team lead can do
//   note        - optional: why, or what is still to agree
//

const rbacRoles = ['Super admin', 'Administrator', 'Authoriser', 'Recommender', 'User', 'Processor']

const userTypes = [
  {
    type: 'Back office case officer',
    persona: 'caseOfficer',
    rbac: ['Recommender', 'Processor', 'User'],
    summary: 'Checks claims and recommends them to pay or reject. Requests changes to claims, and withdrawals, for a team lead to approve.'
  },
  {
    type: 'Back office team lead',
    persona: 'teamLead',
    rbac: ['Super admin'],
    summary: 'Approves or rejects what case officers request, authorises payments and rejections, and manages flags and users.'
  }
]

const permissions = [
  { action: 'See claims and agreements', live: [false, false, false, false, true, true], caseOfficer: 'Yes', teamLead: 'Yes', note: 'Super admins and administrators see them through their other permissions.' },
  { action: 'Recommend a claim to pay', live: [true, true, false, true, false, false], caseOfficer: 'Yes', teamLead: 'Yes' },
  { action: 'Recommend a claim to reject', live: [true, true, false, true, false, false], caseOfficer: 'Yes', teamLead: 'Yes' },
  { action: 'Authorise a claim payment', live: [true, true, true, false, false, false], caseOfficer: 'No', teamLead: 'Yes' },
  { action: 'Authorise a claim rejection', live: [true, true, true, false, false, false], caseOfficer: 'No', teamLead: 'Yes' },
  { action: 'Withdraw a claim', live: [true, true, false, false, false, false], caseOfficer: 'Request', teamLead: 'Request', note: 'A team lead approves. No one can approve their own request.' },
  { action: 'Change claim details', live: [true, false, false, false, false, false], caseOfficer: 'Request', teamLead: 'Yes', note: 'Which details need approval is in the “Who can change what” design note.' },
  { action: 'Approve or reject a request', live: [false, false, false, false, false, false], caseOfficer: 'No', teamLead: 'Yes', note: 'New with the authorisation workflow. Not their own requests.' },
  { action: 'Change a claim status out of sequence', live: [true, false, false, false, false, false], caseOfficer: 'No', teamLead: 'Yes' },
  { action: 'Flag an agreement or claim', live: [true, false, false, false, false, false], caseOfficer: 'Yes', teamLead: 'Yes', note: 'Our proposal: flagging changes nothing for the farmer, so anyone can. The RPA backlog has case officers requesting flags instead. To agree with the RPA.' },
  { action: 'Remove a flag', live: [true, false, false, false, false, false], caseOfficer: 'Own flags', teamLead: 'Any flag', note: 'Our proposal. To agree with the RPA.' },
  { action: 'Add a note to a claim', live: [false, false, false, false, false, false], caseOfficer: 'Yes', teamLead: 'Yes', note: 'New with the authorisation workflow.' },
  { action: 'See who has access (users)', live: [false, false, false, false, false, false], caseOfficer: 'No', teamLead: 'Yes', note: 'New with the authorisation workflow.' }
]

module.exports = { rbacRoles, userTypes, permissions }
