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
    name: 'Authorisation workflow',
    description: 'Backoffice screens where caseworkers check and authorise claims, with design feedback notes and draft redesigns.',
    url: '/prototypes/back-office/authorisation-workflow/'
  },
  {
    name: 'Personas',
    description: 'The people who use the service, inside and outside government. For design discussion only, not for the public website.',
    url: '/prototypes/back-office/personas/'
  }
]
