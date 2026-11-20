//
// Personas: the single source of truth for the people in the prototype.
//
// The personas page (/prototypes/back-office/personas/) and the designs both read from
// here, so change a name or detail once and it updates everywhere.
// Available in every view as `personas`, for example
// {{ personas.farmer.fullName }} or {{ personas.agent.email }}.
//
// All contact details are test data:
// - email addresses use the reserved .test domain, so can never be real
// - phone numbers are from the Ofcom range for drama (07700 900000 to
//   07700 900999), so can never be real
//
// Each persona has:
//   type        - the persona type, for example 'Agent'
//   group       - 'external' or 'internal'
//   firstName, lastName (fullName is added below)
//   image       - file name in app/assets/images/back-office-personas/, without .jpg
//   candidate   - the original image number in ~/Downloads/defra_personnas
//   alt         - alt text for the image
//   goals       - list of goals, as given so far
//   email, phone
//   organisation - who they work for, if anyone
//   business    - farmers only: name, email, SBI and address lines
//
// Internal personas also have, for the draft users pages:
//   status      - 'Active' or 'Deactivated'
//   dateAdded   - when they were given access, as YYYY-MM-DD
//   lastActive  - when they last did something in the service, as YYYY-MM-DD
//   roles       - their role history, most recent first. Each role has:
//                   role      - the role name
//                   from, to  - dates as YYYY-MM-DD. No `to` means current.
//                   changedBy - persona key of who gave them the role, or
//                               text if it was not someone in the service
//                 Their current role is roles[0].role, which matches type.
//
// Every persona also gets an id (its key here), used in links such as
// /prototypes/back-office/authorisation-workflow/draft/users/caseOfficer
//
// Back office users
// -----------------
// Olayinka (BA) confirmed there are only 2 types of back office user:
// case officers and team leads. External users have no back office access.
// caseOfficer (Sanjay Mehta) is the signed-in user in the draft designs, and
// teamLead (Mei Chen) reviews changes. Helen Marsh and Leila Haddad are
// more case officers, so the designs show a mix of people. What each type
// can do is in app/views/prototypes/back-office/data/back-office-roles.js.
//

const personas = {
  farmer: {
    type: 'Farmer',
    group: 'external',
    firstName: 'Tom',
    lastName: 'Harding',
    image: 'farmer',
    candidate: 13,
    alt: 'Person with arms folded, wearing a gilet over a check shirt, in a farmyard',
    goals: ['Manage their details', 'Submit claims', 'Receive payments'],
    email: 'tom@hardingfarms.test',
    phone: '07700 900101',
    business: {
      name: 'Harding Farms',
      email: 'office@hardingfarms.test',
      sbi: '107204504',
      address: ['Old Dairy Farm', '15 Fivefield Road', 'Mitchell', 'Middlesbrough', 'Berkshire', 'SG2 8AG', 'United Kingdom']
    }
  },
  elderlyFarmer: {
    type: 'Elderly farmer with low digital literacy',
    group: 'external',
    firstName: 'Geoff',
    lastName: 'Pritchard',
    image: 'elderly-farmer-low-digital-literacy',
    candidate: 14,
    alt: 'Older person in a flat cap and waxed jacket, arms folded, in a farmyard',
    goals: [],
    email: 'geoff.pritchard@pritchardandson.test',
    phone: '07700 900102',
    business: {
      name: 'Pritchard and Son',
      email: 'geoff.pritchard@pritchardandson.test',
      sbi: '108233561',
      address: ['Upper Hill Farm', 'Llanfair Road', 'Knighton', 'Powys', 'LD7 1NB', 'United Kingdom']
    }
  },
  busyFarmer: {
    type: 'Busy farmer with strong vet relationship',
    group: 'external',
    firstName: 'Claire',
    lastName: 'Whitfield',
    image: 'busy-farmer-strong-vet-relationship',
    candidate: 16,
    alt: 'Person with hair tied up, in a quilted gilet, holding a tablet in a farmyard',
    goals: ['Delegates responsibilities'],
    email: 'claire@whitfielddairy.test',
    phone: '07700 900103',
    business: {
      name: 'Whitfield Dairy',
      email: 'office@whitfielddairy.test',
      sbi: '112904376',
      address: ['Ashlea Farm', 'Moor Lane', 'Clitheroe', 'Lancashire', 'BB7 4JX', 'United Kingdom']
    }
  },
  newFarmer: {
    type: 'New farmer with high tech literacy',
    group: 'external',
    firstName: 'Amara',
    lastName: 'Okafor',
    image: 'new-farmer-high-tech-literacy',
    candidate: 1,
    alt: 'Person with curly hair tied up, wearing an olive waxed jacket',
    goals: ['Empowered to manage their own claims'],
    email: 'amara@brooklanefarm.test',
    phone: '07700 900104',
    business: {
      name: 'Brook Lane Farm',
      email: 'hello@brooklanefarm.test',
      sbi: '121556083',
      address: ['Brook Lane Farm', 'Brook Lane', 'Stroud', 'Gloucestershire', 'GL6 8PQ', 'United Kingdom']
    }
  },
  agent: {
    type: 'Agent',
    group: 'external',
    firstName: 'James',
    lastName: 'Ashworth',
    image: 'agent',
    candidate: 8,
    alt: 'Person with short brown hair and stubble, wearing a waxed jacket with a cord collar',
    goals: ['Acting on behalf of farmers', 'Paid for their services', 'Usually will have work on behalf of multiple farmers'],
    email: 'james@ashworthrural.test',
    phone: '07700 900105',
    organisation: 'Ashworth Rural Consultants'
  },
  caseOfficer: {
    type: 'Back office case officer',
    group: 'internal',
    firstName: 'Sanjay',
    lastName: 'Mehta',
    image: 'back-office-administrator',
    candidate: 4,
    alt: 'Person with glasses and a grey beard, wearing a navy fleece gilet, check shirt and green lanyard',
    goals: ['Check claims and recommend them to pay or reject', 'Request changes to claims, and claim withdrawals', 'Flag agreements and claims that need a closer look', 'Contact point for customers'],
    email: 'sanjay.mehta@rpa.test',
    phone: '07700 900201',
    organisation: 'RPA',
    status: 'Active',
    dateAdded: '2025-03-03',
    lastActive: '2026-11-19',
    roles: [
      { role: 'Back office case officer', from: '2025-03-03', changedBy: 'teamLead' }
    ]
  },
  teamLead: {
    type: 'Back office team lead',
    group: 'internal',
    firstName: 'Mei',
    lastName: 'Chen',
    image: 'back-office-lead',
    candidate: 6,
    alt: 'Person with grey hair tied back, wearing a navy cardigan, striped top and lanyard',
    goals: ['Approve or reject changes and withdrawals requested by case officers', 'Authorise claim payments and rejections', 'Manage flags', 'Obtain statistics', 'Raise system changes'],
    email: 'mei.chen@rpa.test',
    phone: '07700 900202',
    organisation: 'RPA',
    status: 'Active',
    dateAdded: '2024-06-10',
    lastActive: '2026-11-18',
    roles: [
      { role: 'Back office team lead', from: '2024-06-10', changedBy: 'Defra service desk' }
    ]
  },
  // Helen Marsh was a team lead until 31 October 2026, so the change log
  // and her user page show a role that has changed
  helenMarsh: {
    type: 'Back office case officer',
    group: 'internal',
    firstName: 'Helen',
    lastName: 'Marsh',
    image: 'back-office-approver',
    candidate: 20,
    alt: 'Person with glasses, wearing a knitted tank top over a shirt, arms folded, in an office',
    goals: [],
    email: 'helen.marsh@rpa.test',
    phone: '07700 900203',
    organisation: 'RPA',
    status: 'Active',
    dateAdded: '2024-09-16',
    lastActive: '2026-11-14',
    roles: [
      { role: 'Back office case officer', from: '2026-11-01', changedBy: 'teamLead' },
      { role: 'Back office team lead', from: '2024-09-16', to: '2026-10-31', changedBy: 'teamLead' }
    ]
  },
  leilaHaddad: {
    type: 'Back office case officer',
    group: 'internal',
    firstName: 'Leila',
    lastName: 'Haddad',
    image: 'back-office-editor',
    candidate: 9,
    alt: 'Person with dark curly hair tied up, wearing a green jumper and a lanyard',
    goals: [],
    email: 'leila.haddad@rpa.test',
    phone: '07700 900204',
    organisation: 'RPA',
    status: 'Active',
    dateAdded: '2026-10-06',
    lastActive: '2026-10-21',
    roles: [
      { role: 'Back office case officer', from: '2026-10-06', changedBy: 'teamLead' }
    ]
  }
}

for (const [id, persona] of Object.entries(personas)) {
  persona.id = id
  persona.fullName = `${persona.firstName} ${persona.lastName}`
}

module.exports = personas
