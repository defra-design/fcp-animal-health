//
// Project folders listed on the back office index page.
//
// Add one entry per folder in app/views/prototypes/back-office/. Each entry needs:
//   name        - project name. Designs in app/views/prototypes/back-office/data/designs.js with the
//                 same project value are listed on the project's index page.
//   description - one sentence on what the project covers
//   url         - path to the project's index page, ending in /
//

module.exports = [
  {
    name: 'Back office 2.0 optimisation',
    description: 'A redesign of the back office, where RPA case officers and team leads check claims and agreements: the authorisation workflow for changes and withdrawals, flags, roles, users and emails.',
    url: '/prototypes/back-office/authorisation-workflow/'
  },
  {
    name: 'Back office 1.0 optimisation',
    description: 'Small changes to the live back office as it is today, starting with a case officer requesting a change to a claim’s test result and a team lead approving it.',
    url: '/prototypes/back-office/v1-optimisation/'
  },
  {
    name: 'Personas',
    description: 'The people who use the service, inside and outside government. For design discussion only, not for the public website.',
    url: '/prototypes/back-office/personas/'
  }
]
